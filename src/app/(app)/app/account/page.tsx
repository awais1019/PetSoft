import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import SignOutButton from "@/components/sign-out-btn";
import { checkAuth } from "@/lib/server-utils";


import React from "react";

export default async function AccountPage() {
  const session = await checkAuth();
 
  return (
    <main>
      <H1 className="my-4 text-white">Your Account</H1>
      <ContentBlock className="flex justify-center items-center h-[440px] flex-col gap-4">
        <p>Logged in as {session?.user?.email}</p>
        <SignOutButton />
      </ContentBlock>
    </main>
  );
}
