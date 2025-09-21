import Branding from "@/components/branding";
import ContentBlock from "@/components/content-block";
import PetDetails from "@/components/pet-details";
import PetList from "@/components/pet-list";
import SearchForm from "@/components/search-form";
import Stats from "@/components/stats";


import React from "react";

export default  function DashboardPage() {

 
  return (
    <main>
      <div className="flex justify-between p-4 items-center text-white">
        <Branding />
        <Stats />
      </div>

      <div className="grid md:grid-cols-3 grid-rows-[45px_300px_500px] md:grid-rows-[40px_1fr] gap-4 md:h-[500px] px-4 py-2">
        <div className="col-start-1 col-span-1 row-start-1 row-span-1">
          <SearchForm />
        </div>
        <div className="md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1">
          <ContentBlock>
            <PetList />
          </ContentBlock>
        </div>
        <div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}
