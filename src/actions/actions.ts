"use server";

import { signIn } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { PetFormSchema, PetIdSchema } from "@/lib/schema";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function login(data: FormData) {
  const authData = Object.fromEntries(data.entries());

 await signIn("credentials", authData);
}

export async function addPet(pet: unknown) {
  await sleep(1000);
  const validatePet = PetFormSchema.safeParse(pet);
  if (!validatePet.success) {
    return {
      message: "Invalid pet data",
    };
  }
  try {
    await prisma.pet.create({ data: validatePet.data });
  } catch (error) {
    console.log(error);
    return {
      message: "Pet could not be added. Please try again.",
    };
  }

  revalidatePath("/app", "layout");
}
export async function editPet(newPet: unknown, petId: unknown) {
  await sleep(1000);
  const validatePet = PetFormSchema.safeParse(newPet);
  const validatePetId = PetIdSchema.safeParse(petId);
  if (!validatePet.success || !validatePetId.success) {
    return {
      message: "Invalid pet data",
    };
  }
  try {
    await prisma.pet.update({
      where: { id: validatePetId.data },
      data: validatePet.data,
    });
  } catch (error) {
    console.log(error);
    return {
      message: "Pet could not be updated. Please try again.",
    };
  }

  revalidatePath("/app", "layout");
}

export async function checkoutPet(petId: unknown) {
  await sleep(1000);
  const validatePetId = PetIdSchema.safeParse(petId);
  if (!validatePetId.success) {
    return {
      message: "Invalid pet ID",
    };
  }
  try {
    await prisma.pet.delete({ where: { id: validatePetId.data } });
  } catch (error) {
    console.log(error);
    return {
      message: "Pet could not be deleted. Please try again.",
    };
  }

  revalidatePath("/app", "layout");
}
