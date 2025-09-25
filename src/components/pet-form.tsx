"use client";

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import PetFormBtn from "./pet-form-btn";

import { PlaceholderImage } from "@/lib/constants";
import { useForm } from "react-hook-form";

type PetFormProps = {
  actionType: "Add" | "Edit";
  onFormSubmission: () => void;
};
type FormData = {
  name: string;
  ownerName: string;
  imageUrl: string;
  age: number;
  notes: string;
};

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();


  const { register,
    formState: { errors },
    trigger
   } = useForm<FormData>();

  return (
    <form
      action={async (formData) => {
        const result=await trigger();
        if(!result){
          return;
        }

        onFormSubmission();
        const newPet = {
          name: formData.get("name") as string,
          ownerName: formData.get("owner") as string,
          imageUrl: (formData.get("image") as string) || PlaceholderImage,
          age: Number(formData.get("age")),
          notes: formData.get("notes") as string,
        };

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
            {...register("name", { maxLength: { value: 5, message: "Name cannot exceed 5 characters" }, required: { value: true, message: "Name is required" } })}
      
          />
          {errors.name && (<p className="text-sm text-red-600">{errors.name.message}</p>)}
        </div>
        <div className="space-y-2">
          <Label htmlFor="owner">Owner Name</Label>
          <Input
            id="owner"
            type="text"
            {...register("ownerName", { required: { value: true, message: "Owner name is required" } })}
        
          />
          {errors.ownerName && (<p className="text-sm text-red-600">{errors.ownerName.message}</p>)}
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            type="text"
            {...register("imageUrl")}
      
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            {...register("age", { required: true })}
        
          />
          {errors.age && (<p className="text-sm text-red-600">{errors.age.message}</p>)}
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            rows={3}
            {...register("notes", { required: true })}
          />
          {errors.notes && (<p className="text-sm text-red-600">{errors.notes.message}</p>)} 
        </div>
      </div>

      <PetFormBtn actionType={actionType} />
    </form>
  );
}
