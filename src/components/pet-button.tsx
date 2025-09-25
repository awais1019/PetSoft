"use client";
import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PetForm from "./pet-form";
import { flushSync } from "react-dom";

type Props = {
  children: React.ReactNode;
  actionType: "Add" | "Edit" | "Checkout";
  onClick?: () => void;
};

export default function PetButton({ children, actionType, onClick }: Props) {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  if (actionType === "Checkout") {
    return (
      <Button onClick={onClick} variant="secondary">
        {children}
      </Button>
    );
  }
  return (
    <>
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogTrigger asChild>
          {actionType === "Add" ? (
            <Button size="icon">{children}</Button>
          ) : (
            <Button variant={"secondary"}>{children}</Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              {actionType === "Add" ? "Add a Pet" : "Edit Pet"}
            </DialogTitle>
          </DialogHeader>
          <PetForm
            actionType={actionType}
            onFormSubmission={() => flushSync(() => setIsFormOpen(false))}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
