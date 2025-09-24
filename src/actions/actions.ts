"use server";
import { PlaceholderImage } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function addPet(formData: FormData) {
  await sleep(2000);
  try {
    const newPet = {
      name: formData.get("name") as string,
      ownerName: formData.get("owner") as string,
      imageUrl: (formData.get("image") as string) || PlaceholderImage,
      age: Number(formData.get("age") as string),
      notes: formData.get("notes") as string,
    };
    await prisma.pet.create({ data: newPet });
  } catch (error) {
    return {
      message: "Pet could not be added. Please try again.",
    };
  }

  revalidatePath("/app", "layout");
}
export async function editPet(formData: FormData, petId: string) {
  await sleep(2000);
  try {
    const updatedPet = {
      name: formData.get("name") as string,
      ownerName: formData.get("owner") as string,
      imageUrl: (formData.get("image") as string) || PlaceholderImage,
      age: Number(formData.get("age") as string),
      notes: formData.get("notes") as string,
    };
    await prisma.pet.update({ where: { id: petId }, data: updatedPet });
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
      message: "Pet could not be checked out. Please try again.",
    };
  }

  revalidatePath("/app", "layout");
}   