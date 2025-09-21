import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";

import React from "react";

export default function AccountPage() {
  return (
    <main>
      <H1 className="my-4 text-white">Your Account</H1>
      <ContentBlock className="flex justify-center items-center h-[440px]">
        <p>Logged in as ...</p>
      </ContentBlock>
    </main>
  );
}
