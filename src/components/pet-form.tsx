"use client";

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import PetFormBtn from "./pet-form-btn";
import { useForm } from "react-hook-form";
import { PetFormSchema, TPetFormData } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PetEssentials } from "@/lib/types";

type PetFormProps = {
  actionType: "Add" | "Edit";
  onFormSubmission: () => void;
};

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<TPetFormData>({
    resolver: zodResolver(PetFormSchema),
    defaultValues: {
      name: actionType === "Edit" && selectedPet ? selectedPet.name : "",
      ownerName:
        actionType === "Edit" && selectedPet ? selectedPet.ownerName : "",
      imageUrl:
        actionType === "Edit" && selectedPet ? selectedPet.imageUrl : "",
      age: actionType === "Edit" && selectedPet ? selectedPet.age : undefined,
      notes:
        actionType === "Edit" && selectedPet ? selectedPet.notes : "",
    },
    mode: "onBlur",
  });

  return (
    <form
      action={async () => {
        const result = await trigger();
        if (!result) {
          return;
        }
        onFormSubmission();
        
        const newPet: PetEssentials = getValues();
        if (actionType === "Add") {
          handleAddPet(newPet);
        } else if (actionType === "Edit" && selectedPet) {
          handleEditPet(newPet, selectedPet.id);
        }
      }}
      className="flex gap-4 flex-col"
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="owner">Owner Name</Label>
          <Input
            id="owner"
            type="text"
            {...register("ownerName")}
            
          />
          {errors.ownerName && (
            <p className="text-sm text-red-600">{errors.ownerName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input id="image" type="text" {...register("imageUrl")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            {...register("age")}
          />
          {errors.age && (
            <p className="text-sm text-red-600">{errors.age.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            rows={3}
            {...register("notes")}
          />
          {errors.notes && (
            <p className="text-sm text-red-600">{errors.notes.message}</p>
          )}
        </div>
      </div>

      <PetFormBtn actionType={actionType} />
    </form>
  );
}
