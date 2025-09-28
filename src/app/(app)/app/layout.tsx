import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import PetContextProvider from "@/contexts/pet-context-provider";
import SearchContextProvider from "@/contexts/search-context-provider";
import { checkAuth, getAllPetsByUserId } from "@/lib/server-utils";

import React from "react";
import { Toaster } from "sonner";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await checkAuth();
  const pets = await getAllPetsByUserId(session.user.id);
  return (
    <>
      <BackgroundPattern />
      <div className="max-w-5xl mx-auto px- flex flex-col min-h-screen">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>

        <AppFooter />
      </div>
      <Toaster position="top-right" />
    </>
  );
}
