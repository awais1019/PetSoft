"use client";

import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { logout } from "@/actions/actions";

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition();
  return (
    <Button disabled={isPending} onClick={() => startTransition(logout)}>
      Sign Out
    </Button>
  );
}
