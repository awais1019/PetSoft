"use client";

import { Pet } from "@/lib/types";
import React, { useState } from "react";

type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: number | null;
  selectedPet: Pet | null;
  handleChangeSelectedPetId: (id: number | null) => void;
};

export const PetContext = React.createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data,
}: PetContextProviderProps) {
  const [pets, setPets] = useState<Pet[]>(data);
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);


  const selectedPet= pets.find(pet => pet.id === selectedPetId) || null;


  const handleChangeSelectedPetId = (id: number | null) => {
    setSelectedPetId(id);
  }

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        handleChangeSelectedPetId
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
