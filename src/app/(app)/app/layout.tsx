import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import PetContextProvider from "@/contexts/pet-context-provider";
import SearchContextProvider from "@/contexts/search-context-provider";
import prisma from "@/lib/prisma";


import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pets= await prisma.pet.findMany();
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
    </>
  );
}
