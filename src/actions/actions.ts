"use server";

import {signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { PetFormSchema, PetIdSchema } from "@/lib/schema";
import { checkAuth, getPetbyId } from "@/lib/server-utils";
import { sleep } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function login(data: FormData) {
  await signIn("credentials", data);
  redirect("/app/dashboard");
}

export async function register(data: FormData) {
  const hashedPassword = await bcrypt.hash(data.get("password") as string, 10);
  const formData = {
    email: data.get("email") as string,
    password: hashedPassword,
  };

  await prisma.user.create({
    data: {
      email: formData.email,
      hashedPassword: formData.password,
    },
  });
  await signIn("credentials", data);
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}

export async function addPet(pet: unknown) {
  //check if user is authenticated
  const session = await checkAuth();
  await sleep(1000);
  //check if pet data is valid
  const validatePet = PetFormSchema.safeParse(pet);
  if (!validatePet.success) {
    return {
      message: "Invalid pet data",
    };
  }
  //mutate db add pet
  try {
    await prisma.pet.create({
      data: {
        ...validatePet.data,
        userId: session.user.id,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      message: "Pet could not be added. Please try again.",
    };
  }

  revalidatePath("/app", "layout");
}
export async function editPet(newPet: unknown, petId: unknown) {

  //check if user is authenticated
  const session = await checkAuth();
  await sleep(1000);

  //check if pet data and petId are valid
  const validatePet = PetFormSchema.safeParse(newPet);
  const validatePetId = PetIdSchema.safeParse(petId);
  if (!validatePet.success || !validatePetId.success) {
    return {
      message: "Invalid pet data",
    };
  }
  //check if pet belongs to user
  const pet = await getPetbyId(validatePetId.data);
  if (!pet) {
    return {
      message: "Pet not found",
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "Unauthorized",
    };
  }
  //mutate db update pet
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
  //check if user is authenticated
  const session = await checkAuth();
  await sleep(1000);

  //check if petId is valid
  const validatePetId = PetIdSchema.safeParse(petId);
  if (!validatePetId.success) {
    return {
      message: "Invalid pet ID",
    };
  }

  //check if pet belongs to user
  const pet = await getPetbyId(validatePetId.data);
  if (!pet) {
    return {
      message: "Pet not found",
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "Unauthorized",
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
