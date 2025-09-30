"use client";

import { createCheckoutSession } from "@/actions/actions";
import H1 from "@/components/h1";
import { Button } from "@/components/ui/button";
import React from "react";

export default function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {

  
  return (
    <main className="flex flex-col items-center justify-center space-y-8">
      <H1>PetSoft access requires payment </H1>

      {!searchParams.success && (
        <Button onClick={createCheckoutSession}>
          Get life time access by paying $199
        </Button>
      )}

      {searchParams.success && (
        <p className="tex-sm text-green-900">
          Payment successful! You now have access to PetSoft.
        </p>
      )}

      {searchParams.canceled && (
        <p className="tex-sm text-red-900">
          Payment failed or canceled. Please try again.
        </p>
      )}
    </main>
  );
}
