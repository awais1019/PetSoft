import H1 from "@/components/h1";
import PaymentAccessButton from "@/components/payment-acess-btn";
import PaymentButton from "@/components/payment-btn";
import React from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function page(props: { searchParams: SearchParams }) {
  const query = await props.searchParams;

  const success = query.success;
  const canceled = query.canceled;

  return (
    <main className="flex flex-col items-center justify-center space-y-8">
      <H1>PetSoft access requires payment </H1>
      {!success && <PaymentButton />}

      {success && <PaymentAccessButton />}


      {success && (
        <p className="tex-sm text-green-900">
          Payment successful! You now have access to PetSoft.
        </p>
      )}

      {canceled && (
        <p className="tex-sm text-red-900">
          Payment failed or canceled. Please try again.
        </p>
      )}
    </main>
  );
}
