import z from "zod";
import { PlaceholderImage } from "./constants";

export const PetFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  ownerName: z
    .string()
    .trim()
    .min(1, { message: "Owner's name is required" })
    .max(50, { message: "Owner's name cannot exceed 50 characters" }),
  imageUrl: z
    .union([z.literal(""), z.url({ message: "Invalid URL format" })])
    .transform((url) => url || PlaceholderImage),
  age: z.coerce
    .number<number>()
    .int()
    .positive()
    .min(1, { message: "Age must be a positive number" })
    .max(100, { message: "Age seems unrealistic" }),

  notes: z.union([z.literal(""), z.string().trim().min(1).max(500)]),
});

export type TPetFormData = z.infer<typeof PetFormSchema>;
export const PetIdSchema = z.cuid();


export const authSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(100),
});
export type AuthData = z.infer<typeof authSchema>;