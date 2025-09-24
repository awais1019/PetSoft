"use server"
import { PlaceholderImage } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

 

export async function AddPet(formData: FormData) {
    const newPet = {
        name: formData.get("name") as string,
        ownerName: formData.get("owner") as string,
        imageUrl: (formData.get("image") as string) || PlaceholderImage,
        age: Number(formData.get("age") as string),
        notes: formData.get("notes") as string,
    };
    await prisma.pet.create({data: newPet});

    revalidatePath("/app","layout");
}

