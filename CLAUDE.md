# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # start dev server (Next.js App Router)
npm run build             # production build
npm run vercel-build      # prisma generate && next build (what Vercel actually runs)
npm run start             # run production build
npm run lint              # eslint
npx tsc --noEmit          # typecheck (no dedicated npm script exists)
npx prisma generate       # regenerate Prisma client into src/generated/prisma (run after schema/query changes)
npx prisma db push        # push schema changes to the database (no migrations dir is used)
```

There is no test suite/framework configured in this repo. There's also no dedicated `postinstall`/typecheck script beyond `postinstall: prisma generate`.

## Architecture

PetSoft is a Next.js 15 App Router app: pet CRUD behind auth, gated by a one-time Stripe payment. Auth is Auth.js v5 (`next-auth@5.0.0-beta.29`, Credentials provider), DB is Postgres via Prisma, generated client lives at `src/generated/prisma` (import from `@/generated/prisma`, not `@prisma/client`).

### Two-tier auth config (edge vs. node)

Auth.js config is deliberately split into two files because `src/middleware.ts` runs on the Edge runtime, which can't use bcrypt/Prisma, and Vercel enforces a middleware bundle size limit:

- `src/lib/auth-edge.ts` — edge-safe config (`nextAuthEdgeConfig`), used only by `src/middleware.ts`. Contains the `authorized` callback that gates every route via the middleware `matcher` (`src/middleware.ts`), `jwt`, and `session` callbacks. No providers defined here.
- `src/lib/auth-no-edge.ts` — full config for server actions/API routes (Node runtime). Spreads `nextAuthEdgeConfig` and adds the `Credentials` provider (bcrypt password check against `User.hashedPassword` via Prisma). This is the `auth`/`signIn`/`signOut`/`handlers` used everywhere outside middleware.
- `src/app/api/auth/[...nextauth]/route.ts` wires `auth-no-edge.ts`'s `handlers` as the NextAuth route handler (`runtime = "nodejs"`).

When touching auth/session logic, keep both files in sync deliberately — `auth-edge.ts` callbacks are the source of truth for routing/gating (`authorized`), `auth-no-edge.ts` extends them for full session refresh logic (e.g. re-reading `hasAccess` from the DB on `trigger === "update"`).

**Access model**: `User.hasAccess` (boolean, Prisma) is mirrored onto the JWT/session (`session.user.hasAccess`, typed via `src/lib/next-auth.d.ts`). The middleware's `authorized` callback in `auth-edge.ts` uses `hasAccess` + pathname (`/app/*` vs `/login`/`/signup` vs everything else) to decide access/redirects. **Any `Response.redirect(...)` returned from this callback must be guarded to only fire on GET requests** — Next.js Server Actions are invoked as POSTs to the same route they're called from (not under `/api`, so they're NOT excluded by the middleware matcher), and a redirect response breaks the RSC response contract Next expects for a Server Action, crashing the client with "An unexpected response was received from the server."

### Server Actions, not API routes, for mutations

All CRUD and auth mutations go through `"use server"` functions in `src/actions/actions.ts` (login, register, logout, addPet, editPet, checkoutPet [deletes a pet], createCheckoutSession), not REST handlers. `checkAuth()` (`src/lib/server-utils.ts`) is the shared guard called at the top of any action/layout that requires a session — it redirects to `/login` if there's no session, but does **not** check `hasAccess`; actions that must be gated on paid access (e.g. `createCheckoutSession`) need an explicit `session.user.hasAccess` check of their own.

The only two `/api` routes are middleware-exempt by design: `src/app/api/auth/[...nextauth]/route.ts` (NextAuth handlers) and `src/app/api/stripe/route.ts` (Stripe webhook — verifies `stripe-signature`, sets `hasAccess: true` on `checkout.session.completed`).

### Route groups

- `src/app/(home)` — public marketing page.
- `src/app/(auth)` — `/login`, `/signup`, `/payment` (all public at the routing level; middleware/page logic decides what renders).
- `src/app/(app)/app` — authenticated, paid-access area (`/app/dashboard`, `/app/account`). `src/app/(app)/app/layout.tsx` calls `checkAuth()` + `getAllPetsByUserId()` and wraps children in `PetContextProvider`/`SearchContextProvider`.

### Client state

- `PetContext` (`src/contexts/pet-context-provider.tsx`) holds the pet list and wraps every mutation in `useOptimistic` (add/edit/delete) before awaiting the corresponding server action; on error it rolls back implicitly (optimistic state reconciles on next server round-trip) and shows a `sonner` toast.
- `SearchContext` (`src/contexts/search-context-provider.tsx`) holds the search query used to filter the pet list client-side.
- Forms use `react-hook-form` + Zod resolvers; schemas/types live in `src/lib/schema.ts` (`PetFormSchema`, `authSchema`) — Zod infers the TS types (`TPetFormData`, `AuthData`), don't hand-write parallel interfaces.

### Payment flow

`PaymentButton` (`src/components/payment-btn.tsx`) → `createCheckoutSession` server action (`src/actions/actions.ts`) creates a Stripe Checkout session and redirects to Stripe. On success, Stripe redirects back to `/payment?success=true`, where `PaymentAccessButton` (`src/components/payment-acess-btn.tsx`) calls `useSession().update(...)` to force the JWT `trigger === "update"` path (re-reads `hasAccess` from the DB) before navigating into `/app`. The webhook (`src/app/api/stripe/route.ts`) is the authoritative place `hasAccess` actually flips to `true` in the DB — the client-side `update()` call is just to refresh the stale session/JWT after that.

### Prisma

`prisma/schema.prisma` defines `User` and `Pet` (and an unrelated `EventoEvent` model — the same DB is shared with another project, per the schema comment). `src/lib/prisma.ts` is the standard singleton-client pattern for Next.js dev hot-reload. `next.config.ts` wires `@prisma/nextjs-monorepo-workaround-plugin` into the server webpack build — this and `prisma generate` in `postinstall`/`vercel-build` exist specifically to avoid Prisma client/binary resolution failures on Vercel; don't remove them without confirming the underlying Vercel build issue is gone.

### Path alias

`@/*` maps to `src/*` (see `tsconfig.json`). The README references an older `src/libs/` structure — the actual directory is `src/lib/`.
