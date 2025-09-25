"use server";
import prisma from "@/lib/prisma";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function addPet(pet) {
  await sleep(2000);
  try {
    await prisma.pet.create({ data: pet });
  } catch (error) {
    return {
      message: "Pet could not be added. Please try again.",
    };
  }

  revalidatePath("/app", "layout");
}
export async function editPet(newPet, petId: string) {
  await sleep(2000);
  try {
    await prisma.pet.update({ where: { id: petId }, data: newPet });
  } catch (error) {
    return {
      message: "Pet could not be updated. Please try again.",
    };
  }

  revalidatePath("/app", "layout");
}

export async function checkoutPet(petId: string) {
  await sleep(2000);
  try {
    await prisma.pet.delete({ where: { id: petId } });
  } catch (error) {
    return {
      message: "Pet could not be deleted. Please try again.",
    };
  }

  revalidatePath("/app", "layout");
}

