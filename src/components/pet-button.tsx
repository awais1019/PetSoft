import React from "react";
import { Button } from "./ui/button";


type Props = {
  children: React.ReactNode;
  actionType: "Add" | "Edit" | "Checkout";
};

export default function PetButton({ children, actionType }: Props) {
  return (
    <>
      {actionType === "Add" && <Button size="icon">{children}</Button>}
      {actionType === "Edit" && <Button variant="secondary">{children}</Button>}
      {actionType === "Checkout" && (
        <Button variant="secondary">{children}</Button>
      )}
    </>
  );
}
