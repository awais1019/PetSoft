"use client";

import { useSearchContext } from "@/lib/hooks";
import React from "react";

export default function SearchForm() {
  const { searchQuery, handleSearch } = useSearchContext();

  return (
    <form className="w-full h-full">
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search Pets"
        className="w-full h-full rounded-md outline-none  px-4 py-2 bg-white/20
         focus:bg-white/50 hover:bg-white/30 placeholder:text-white/50  transition"
      />
    </form>
  );
}
