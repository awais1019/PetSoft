"use client";

import { usePetContext, useSearchContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";

import Image from "next/image";
import React from "react";

export default function PetList() {
  const { pets, selectedPetId, handleChangeSelectedPetId } = usePetContext();
  const { searchQuery } = useSearchContext();
  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <ul className="bg-white border-b border-light rounded-lg overflow-hidden">
      {filteredPets.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => handleChangeSelectedPetId(pet.id)}
            className={cn(
              "w-full h-[70px] cursor-pointer hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition px-5 flex items-center gap-3 text-base",
              {
                "bg-[#EFF1F2]": selectedPetId === pet.id,
              }
            )}
          >
            <Image
              src={pet.imageUrl}
              alt="pet image"
              width={45}
              height={45}
              unoptimized
              className="rounded-full object-cover h-[45px] w-[45px]"
            />
            <p className="text-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
