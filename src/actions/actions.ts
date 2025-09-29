"use server";

import prisma from "@/lib/prisma";
import { signIn, signOut } from "@/lib/auth";
import { authSchema, PetFormSchema, PetIdSchema } from "@/lib/schema";
import { checkAuth, getPetbyId } from "@/lib/server-utils";
import { getPrismaErrorMessage, sleep } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export async function login(prevState: unknown, data: unknown) {
  await sleep(1000);
  if (!(data instanceof FormData)) {
    return {
      error: "Invalid form data",
    };
  }

  try {
    await signIn("credentials", data);
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid Credentials" };
    }
    throw error;
  }
}

export async function register(prevState: unknown, data: unknown) {
  await sleep(1000);
  if (!(data instanceof FormData)) {
    return {
      error: "Unexpected form submission. Please refresh and try again.",
    };
  }
  const formData = Object.fromEntries(data.entries());
  const validFormData = authSchema.safeParse(formData);
  if (!validFormData.success) {
    return {
      error: "Looks like some details are missing or invalid. Can you double-check?",
    };
  }
  const { email, password } = validFormData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword: hashedPassword,
      },
    });
  } catch (error) {
  return { error: getPrismaErrorMessage(error) };
}
  await signIn("credentials", data);
}

export async function logout() {
  await sleep(100);
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
