"use client";
import React, { useState } from "react";


type SearchContextProviderProps = {
  children: React.ReactNode;
};

type TSearchContext = {
  searchQuery: string;
  handleSearch: (query: string) => void;
};

export const SearchContext = React.createContext<TSearchContext | null>(null);

export default function SearchContextProvider({
  children,
}: SearchContextProviderProps) {

    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearch = (query: string) => {
      setSearchQuery(query);
    };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        handleSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

