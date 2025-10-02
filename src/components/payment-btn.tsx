"use client"


import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { createCheckoutSession } from "@/actions/actions";

export default function PaymentButton() {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      onClick={() => startTransition(createCheckoutSession)}
    >
      Get life time access by paying $199
    </Button>
  );
}
