"use client";

import { addPet, checkoutPet, editPet } from "@/actions/actions";
import { Pet } from "@/generated/prisma";
import { PetEssentials } from "@/lib/types";
import React, {  useOptimistic, useState } from "react";
import { toast } from "sonner";

type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

type TPetContext = {
  pets: Pet[];
  totalPets: number;
  selectedPetId: Pet["id"] | null;
  selectedPet: Pet | null;
  handleChangeSelectedPetId: (id: Pet["id"] | null) => void;
  handleAddPet: (pet: PetEssentials) => Promise<void>;
  handleCheckoutPet: (id: Pet["id"]) => Promise<void>;
  handleEditPet: (
    updatedPet: PetEssentials,
    selectedId: Pet["id"]
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

    const handleChangeSelectedPetId = (id: Pet["id"] | null) => {
    setSelectedPetId(id);
  };
  const handleAddPet = async (pet: PetEssentials) => {
    setOptimisticPets({ action: "add", payload: pet });
    const error = await addPet(pet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleCheckoutPet = async (id: Pet["id"]) => {
    setOptimisticPets({ action: "delete", payload: id });
    const error = await checkoutPet(id);
    if (error) {
      toast.warning(error.message);
      return;
    }
    setSelectedPetId(null);
  };
  const handleEditPet = async (
    updatedPet: PetEssentials,
    selectedId: Pet["id"]
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
