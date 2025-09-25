"use client";

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import PetFormBtn from "./pet-form-btn";

import { PlaceholderImage } from "@/lib/constants";

type PetFormProps = {
  actionType: "Add" | "Edit";
  onFormSubmission: () => void;
};

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  return (
    <form
      action={async (formData) => {
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
