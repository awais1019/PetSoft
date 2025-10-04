import { handlers } from "@/lib/auth-no-edge";
// app/api/auth/[...nextauth]/route.ts
export const runtime = "nodejs";

export const { GET, POST } = handlers;
