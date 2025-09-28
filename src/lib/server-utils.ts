import "server-only";

import { redirect } from "next/navigation";
import { auth } from "./auth";
import prisma from "./prisma";
import { Pet, User } from "@/generated/prisma";

export async function checkAuth() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return session;
}
export async function getPetbyId(petId: Pet["id"]) {
  const pet = await prisma.pet.findUnique({
    where: { id: petId },
  });

  return pet;
}
export async function getAllPetsByUserId(userId: string) {
  const pets = await prisma.pet.findMany({
    where: { userId },
  });
  return pets;
}
export async function getUserbyEmail(email: User["email"]) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
}
