import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(ms: number) {
  return new Promise(resolve=>setTimeout(resolve,ms));
}
export function getPrismaErrorMessage(error: any) {
  if (error?.code === "P2002") return "Email already exists";
  return "User could not be created. Please try again.";
}