import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import PetContextProvider from "@/contexts/pet-context-provider";
import SearchContextProvider from "@/contexts/search-context-provider";
import { Pet } from "@/lib/types";

import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  );
  const pets: Pet[] = await data.json();
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
