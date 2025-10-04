[33mcommit 3b993e890b602ffa3081caf55b76addb55f4df55[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m)[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Sat Oct 4 11:48:59 2025 +0500

    reduce middleware size

[33mcommit 1675f0091a9ee0b2ef4acd16055c936a8e5061f2[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Fri Oct 3 23:54:34 2025 +0500

    feat(middleware) divide middleware into two files

[33mcommit dc767912fff2fa0fcbf2ae3d733ec773e39d7c06[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Fri Oct 3 22:54:19 2025 +0500

    Fix Path Alias for vercel and logo file import and edit elsint.config.mjs to ignore during build.

[33mcommit cfe7ff28727399e95269725ee3de109454b8e581[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Fri Oct 3 22:32:55 2025 +0500

    Restore logo.tsx with correct casing

[33mcommit 56ef6015f3fa865368cb8a7309d46fcc3c2cd917[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Fri Oct 3 22:32:54 2025 +0500

    Temporary rename to force casing change

[33mcommit 0c285286a8ad33e5f87142c94a9ce132501b8070[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Fri Oct 3 22:19:19 2025 +0500

    Fix all filename casing for Linux/Vercel

[33mcommit 9fe5bc5edb1f1d2ee6a9fb90da0ab7aa55f4415c[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Fri Oct 3 21:21:27 2025 +0500

    add some config changes

[33mcommit 26576aba2bda34dd6e3516f421c2775c6088b124[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Fri Oct 3 14:52:33 2025 +0500

    refactor(db) replace sqlite db with postgres

[33mcommit d637b31dcb7bccd2b9a4f635eecf0674c61179d9[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Thu Oct 2 23:11:31 2025 +0500

    feat(payments): implement complete Stripe checkout and webhook flow
    
    - integrated Stripe Checkout session creation
    - added webhook endpoint to handle checkout.session.completed
    - updated Prisma user model with hasAccess flag on successful payment
    - configured NextAuth jwt/session callbacks to sync hasAccess from DB
    - protected routes using middleware based on user auth and payment status
    - enabled local development with ngrok for webhook testing

[33mcommit 1f18df0dcc39f32ed2cdee8b9f62c15d9d9a30cc[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Thu Oct 2 22:16:55 2025 +0500

    feat(apyments) add custom route that update payment status and refresh token

[33mcommit a63674e86835921d2caeee2edc64560ca1c39022[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Tue Sep 30 22:20:33 2025 +0500

    feat(payment) add inital stripe payment setup

[33mcommit 1114a237012b109b1261939e373264e213434c01[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Mon Sep 29 23:26:14 2025 +0500

    feat(ui) add payment page

[33mcommit da95bf60e1877f4293c467e2862da93ad36d5204[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Mon Sep 29 20:46:42 2025 +0500

    feat(validations): add full auth form validations with useActionState; handle server responses to show UI errors (e.g., email already exists, invalid credentials)

[33mcommit 4f6a24bfa650d8042b25fa6a71d8b69aaf0cc03f[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Sun Sep 28 15:51:01 2025 +0500

    feat(auth) add authentication,authorization logic before mutating pet data

[33mcommit 5e1b397921fa9caa30ccf33058026596e1d8f82e[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Sun Sep 28 12:39:03 2025 +0500

    feat(ui) add signout button which clear token and end user valid session

[33mcommit bc5f51c0266914c5cdeb1016ab063e70154a0927[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Sun Sep 28 02:32:50 2025 +0500

    feat(auth) add basic authentication using Auth.js

[33mcommit c25eb270274b8187d6e8b448c885099273aad290[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Fri Sep 26 22:33:03 2025 +0500

    feat(ui) add middleware file and User Prisma Model and Seed Data

[33mcommit 202a5f81c7fe86b1fc884b106845cf2cb5f8b0d2[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Fri Sep 26 17:04:11 2025 +0500

    feat(ui) add auth (signup and login page) ui

[33mcommit ae8a616ea0564da621d65b93a74060e2e46f6552[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Fri Sep 26 12:48:58 2025 +0500

    feat(validations) add client and server side valitions using zod

[33mcommit 84df038ae14c1ea73a218dd0bdc3678d9be64b23[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Thu Sep 25 14:35:34 2025 +0500

    perf(ui) use React useForm inplace of custom Form

[33mcommit 6db6b594c7f0bf32b37dd7ffc78580162494c931[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Thu Sep 25 10:31:42 2025 +0500

    refactor(types): replace custom types with Prisma-generated types for pets

[33mcommit 0c53eab9ec151e430d5be638d88f49b2df2076b3[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Thu Sep 25 10:01:04 2025 +0500

    perf(ui): refactor state handling with useOptimistic reducer to update locally before Prisma actions

[33mcommit 52a736d79a87c1cf34a30f5a129c3019437ece9c[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Wed Sep 24 13:39:16 2025 +0500

    refactor(interactions) add edit & checkout pet server action

[33mcommit 1a3df9b62e7585b99d9d546948622420b10d337a[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Wed Sep 24 13:21:44 2025 +0500

    feat(ui) add Sever Action Error and Loading State ui

[33mcommit 40a92d802eab7df9b36da0b8e05f961f1d87ce83[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Wed Sep 24 12:59:53 2025 +0500

    refactor(submit) add AddPet Server Action in place of onSubmit handler

[33mcommit 96364f522ec2713d0322b6ee60e4e37ae18e7375[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Tue Sep 23 16:09:37 2025 +0500

    refactor(api): use Prisma client to get pets from DB instead of fetch API

[33mcommit 24236efd02fe9ec18d02fa5b973e1f8957aadaad[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Mon Sep 22 22:53:53 2025 +0500

    chore(prisma): setup prisma, sqlite db, client, pet model and seed with tsx

[33mcommit 24f310dc5c324d7b89faa56b01388cbd96881e94[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Mon Sep 22 21:27:29 2025 +0500

    feat(ui) add update pet feature

[33mcommit f1a2336510e29edcca8def21ce68809930e16116[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Mon Sep 22 18:04:53 2025 +0500

    feat(ui): add pet form functionality with shadcn components

[33mcommit 4d8bd369d809015fe64f62d2ab75262f7d67563e[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Mon Sep 22 11:22:19 2025 +0500

    refactor(ui) replace pet  placeholder image  with original images and checkout button functionality

[33mcommit e3871a306849c32382ad0297a0715592fab66965[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Mon Sep 22 10:51:48 2025 +0500

    feat(ui) add pet action buttons ui
     (add,edit,checkout)

[33mcommit 29c2482ae4889d17cb6f4ffca514227951e4843b[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Sun Sep 21 17:01:37 2025 +0500

    feat(ui): add account page layout and make H1 & ContentBlock components reusable with cn utility (clsx + tailwind-merge)

[33mcommit 21389fd73335922d9fab7d5f4789c454168e23a1[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Sun Sep 21 16:44:15 2025 +0500

    feat(ui) add search feature
    
    make separate search-context-provider search query is used in more than one place (searchform,petlist)

[33mcommit 04df1dd4af15553fada041b1a569635f3e47ed09[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Sun Sep 21 14:54:02 2025 +0500

    feat(ui) complete pet details section

[33mcommit 02d1e7dcb130e173dc6a6cd082978dac36ae84c6[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Sun Sep 21 08:53:39 2025 +0500

    feat(context): add context provider for pets data
    
    Pets data is now shared via context since it is used in multiple places such as PetList and PetDetails components.

[33mcommit 71aa81b49ee1b52081ad41bac2150ff925f49875[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Sun Sep 21 08:08:41 2025 +0500

    feat(ui) add petlist ui and fetch dummy data

[33mcommit 6b6df4bf75ecbfa771d68a083ebb19d26c1f67db[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Sat Sep 20 20:16:25 2025 +0500

    feat(ui) add dashboard page layout using grid

[33mcommit 3679311f46bf3b20333484ca0e580a2fb0c7fb95[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Sat Sep 20 14:23:53 2025 +0500

    feat(ui): add private app structure (dashboard, account) with shared layout

[33mcommit ba2de6aa74f63dd204ef7df5ed02c8ef77f0a830[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Sat Sep 20 11:36:58 2025 +0500

    feat(ui): add shadcn Button on homepage

[33mcommit be8da4440603a926072f0f0c5d8ccaca4412a85b[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Fri Sep 19 22:33:53 2025 +0500

    feat(routing) add basic project routing and set home page ui

[33mcommit 985de2fc972bc0e6a3ec4a0afb9bb66a951f2886[m
Author: Awais Ashraf <mhawais154@gmail.com>
Date:   Wed Sep 10 18:19:11 2025 +0500

    Initial commit from Create Next App
