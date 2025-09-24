"use client";

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import { addPet,editPet } from "@/actions/actions";
import PetFormBtn from "./pet-form-btn";
import { toast } from "sonner";


type PetFormProps = {
  actionType: "Add" | "Edit";
  onFormSubmission: () => void;
};

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet } = usePetContext();
  
  return (
    <form action={async (formData) =>
    {
      if(actionType === "Add"){
        const error = await addPet(formData);
        if (error) {
          toast.warning(error.message);
          return;
        }
      } else if (actionType === "Edit" && selectedPet) {
        const error = await editPet(formData, selectedPet.id);
        if (error) {
          toast.warning(error.message);
          return;
        }
      }
    
      onFormSubmission();
    }
      } className="flex gap-4 flex-col">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            required
            defaultValue={actionType === "Edit" ? selectedPet?.name : ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="owner">Owner Name</Label>
          <Input
            id="owner"
            type="text"
            name="owner"
            defaultValue={actionType === "Edit" ? selectedPet?.ownerName : ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            type="text"
            name="image"
            defaultValue={actionType === "Edit" ? selectedPet?.imageUrl : ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            name="age"
            defaultValue={actionType === "Edit" ? selectedPet?.age : ""}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={3}
            defaultValue={actionType === "Edit" ? selectedPet?.notes : ""}
            required
          />
        </div>
      </div>

      <PetFormBtn actionType={actionType} />
    </form>
  );
}
