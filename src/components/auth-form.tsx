"use client";

import * as React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { login, register } from "@/actions/actions";
import { useActionState } from "react";

type AuthFormProps = {
  type: "login" | "signup";
};

export default function AuthForm({ type }: AuthFormProps) {

  const [ state, formAction, isPending ] = useActionState(type === "login" ? login : register,null);


  return (
    <form action={formAction}>
      <div className="space-y-2 mb-4">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" required />
      </div>
      <div className="space-y-2 mb-4">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" minLength={6} maxLength={100} required  />
      </div>
      <Button disabled={isPending} type="submit">{type === "login" ? "Log In" : "Sign Up"}</Button>
      {state?.error && <p className="text-red-500 mt-2">{state.error}</p>}
    </form>
  );
}
