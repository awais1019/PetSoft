"use client";

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import { Button } from "./ui/button";

type PetFormProps = {
  actionType: "Add" | "Edit";
  onFormSubmission?: () => void;
};

export default function PetForm({ actionType, onFormSubmission }: PetFormProps) {
  const { handleAddPet } = usePetContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPet = {
      name: formData.get("name") as string,
      ownerName: formData.get("owner") as string,
      imageUrl:
        (formData.get("image") as string) ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      age: Number(formData.get("age") as string),
      notes: formData.get("notes") as string,
    };
    handleAddPet(newPet);
    onFormSubmission?.();
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-4 flex-col">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="owner">Owner Name</Label>
          <Input id="owner" type="text" name="owner" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input id="image" type="text" name="image" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" name="age" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" name="notes" rows={3} required />
        </div>
      </div>

      <Button className="self-end mt-2">
        {actionType === "Add" ? "Add Pet" : "Save Changes"}
      </Button>
    </form>
  );
}
