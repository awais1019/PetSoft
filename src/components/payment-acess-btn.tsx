import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function PaymentAccessButton() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        await update({ hasAccess: true });
        router.push("/app/dashboard");
      }}
      disabled={status === "loading" || session?.user.hasAccess}
    >
      Access PetSoft
    </Button>
  );
}
