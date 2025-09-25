"use client";

import { addPet, checkoutPet, editPet } from "@/actions/actions";
import { Pet } from "@/lib/types";
import React, {  useOptimistic, useState } from "react";
import { toast } from "sonner";

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
  handleAddPet: (pet: Omit<Pet, "id">) => Promise<void>;
  handleCheckoutPet: (id: string) => Promise<void>;
  handleEditPet: (
    updatedPet: Omit<Pet, "id">,
    selectedId: string
  ) => Promise<void>;
};

export const PetContext = React.createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data,
}: PetContextProviderProps) {
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          const newPet = payload as Omit<Pet, "id">;
          return [...state, { ...newPet, id: Math.random().toString() }];
        case "edit":
          const { updatedPet, selectedId } = payload as {
            updatedPet: Omit<Pet, "id">;
            selectedId: string;
          };
          return state.map((pet) =>
            pet.id === selectedId ? { ...pet, ...updatedPet } : pet
          );
        case "delete":
          const id = payload as string;
          return state.filter((pet) => pet.id !== id);
        default:
          return state;
      }
    }
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet =
    optimisticPets.find((pet) => pet.id === selectedPetId) || null;
  const totalPets = optimisticPets.length;

  const handleAddPet = async (pet: Omit<Pet, "id">) => {
    setOptimisticPets({ action: "add", payload: pet });
    const error = await addPet(pet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };
  const handleChangeSelectedPetId = (id: string | null) => {
    setSelectedPetId(id);
  };
  const handleCheckoutPet = async (id: string) => {
    setOptimisticPets({ action: "delete", payload: id });
    const error = await checkoutPet(id);
    if (error) {
      toast.warning(error.message);
      return;
    }
    setSelectedPetId(null);
  };
  const handleEditPet = async (
    updatedPet: Omit<Pet, "id">,
    selectedId: string
  ) => {
    setOptimisticPets({ action: "edit", payload: { updatedPet, selectedId } });
    const error = await editPet(updatedPet, selectedId);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };
  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        selectedPet,
        totalPets,
        handleChangeSelectedPetId,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
