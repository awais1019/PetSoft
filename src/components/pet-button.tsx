import React from "react";
import { Button } from "./ui/button";


type Props = {
  children: React.ReactNode;
  actionType: "Add" | "Edit" | "Checkout";
  onClick?: () => void;
};

export default function PetButton({ children, actionType, onClick }: Props) {
  return (
    <>
      {actionType === "Add" && <Button size="icon">{children}</Button>}
      {actionType === "Edit" && <Button variant="secondary">{children}</Button>}
      {actionType === "Checkout" && (
        <Button variant="secondary" onClick={onClick}>{children}</Button>
      )}
    </>
  );
}
