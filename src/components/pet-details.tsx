"use client";

import { usePetContext } from "@/lib/hooks";
import { Pet } from "@/lib/types";

import Image from "next/image";
import React from "react";
import PetButton from "./pet-button";
import { PlaceholderImage } from "@/lib/constants";
import { checkoutPet } from "@/actions/actions";

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className="flex flex-col w-full h-full">
      {selectedPet ? (
        <>
          <TopBar pet={selectedPet} />
          <OtherInfo pet={selectedPet} />
          <NotesSection pet={selectedPet} />
        </>
      ) : (
        <EmptyView />
      )}
    </section>
  );
}

type Props = {
  pet: Pet;
};
function EmptyView() {
  return (
    <p className="flex text-lg font-medium items-center justify-center h-full text-zinc-800">
      No pet selected
    </p>
  );
}
function TopBar({ pet }: Props) {
  return (
    <div className="flex items-center px-5 py-3 bg-white border-b border-light">
      <Image
        src={pet.imageUrl || PlaceholderImage}
        alt="pet image"
        width={70}
        unoptimized
        height={70}
        className="rounded-full object-cover h-[70px] w-[70px]"
      />
      <h2 className="text-2xl font-semibold ml-4 leading-7">{pet?.name}</h2>
      <div className="ml-auto space-x-2">
        <PetButton actionType="Edit">Edit</PetButton>
        <PetButton
          actionType="Checkout"
          onClick={async () => await checkoutPet(pet.id)}
        >
          Checkout
        </PetButton>
      </div>
    </div>
  );
}
function OtherInfo({ pet }: Props) {
  return (
    <div className="flex text-center justify-around px-8 py-5">
      <div>
        <h3 className="text-[13px] text-zinc-700 uppercase font-medium ">
          Owner Name
        </h3>
        <p className="text-sm text-zinc-800 mt-1">{pet?.ownerName}</p>
      </div>
      <div>
        <h3 className="text-[13px] text-zinc-700 uppercase font-medium ">
          Age
        </h3>
        <p className="text-sm text-zinc-800 mt-1">{pet?.age}</p>
      </div>
    </div>
  );
}
function NotesSection({ pet }: Props) {
  return (
    <section className="bg-white px-7 py-5 border mb-4 border-light rounded-md mx-8 flex-1">
      {pet?.notes}
    </section>
  );
}
