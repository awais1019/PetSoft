import { Pet } from "@/lib/types";
import Image from "next/image";
import React from "react";


type PetListProps = {
  pets: Pet[];
};

export default function PetList({ pets }: PetListProps) {
  return (
    <ul className="bg-white border-b border-black/[0.1] rounded-lg overflow-hidden">
      {pets.map((pet) => (
        <li key={pet.id}>
          <button className="w-full h-[70px] cursor-pointer hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition px-5 flex items-center gap-3 text-base">
            <Image
              src={pet.imageUrl}
              alt="pet image"
              width={45}
              height={45}
              className="rounded-full object-cover h-[45px] w-[45px]"
          />
          <p className="text-semibold">{pet.name}</p>
        </button>
      </li>
      ))}
    </ul>
  );
}
