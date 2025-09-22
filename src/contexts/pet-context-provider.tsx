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
  handleAddPet: (pet: Omit<Pet, "id">) => void;
  handleCheckoutPet: (id: string) => void;
  handleEditPet: (updatedPet: Pet) => void;
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

  const handleAddPet = (pet: Omit<Pet, "id">) => {
    const newPet = {
      id: (Math.random() * 10000).toFixed(0),
      ...pet
    }
    setPets((prevPets) => [...prevPets, newPet]);
  }
  const handleChangeSelectedPetId = (id: string | null) => {
    setSelectedPetId(id);
  }
  const handleCheckoutPet = (id: string) => {
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
  }
  const handleEditPet = (updatedPet: Pet) => {
    setPets((prevPets) =>
      prevPets.map((pet) => (pet.id === updatedPet.id ? updatedPet : pet))
    );
  } 
  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        totalPets,
        handleChangeSelectedPetId,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
