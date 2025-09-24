"use server";
import { PlaceholderImage } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function AddPet(formData: FormData) {
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
