import { Pet } from "@/generated/prisma";

export type PetEssentials=Omit<Pet,"id"|"createdAt"|"updatedAt" | "userId">;


