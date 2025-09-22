"use client";

import { Pet } from "@/lib/types";
import React, { useState } from "react";

type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

type TPetContext = {
  pets: Pet[];
  totalPets: number;
  selectedPetId: string | null;
  selectedPet: Pet | null;
  handleChangeSelectedPetId: (id: string | null) => void;
  handleCheckoutPet: (id: string) => void;
};

export const PetContext = React.createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data,
}: PetContextProviderProps) {
  const [pets, setPets] = useState<Pet[]>(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);


  const selectedPet= pets.find(pet => pet.id === selectedPetId) || null;
  const totalPets = pets.length;


  const handleChangeSelectedPetId = (id: string | null) => {
    setSelectedPetId(id);
  }
  const handleCheckoutPet = (id: string) => {
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
  }

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        totalPets,
        handleChangeSelectedPetId,
        handleCheckoutPet
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
