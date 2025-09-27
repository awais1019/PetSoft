import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <main>
      <H1 className="text-center mb-2">Log In</H1>
      <AuthForm type="login"/>
      <p className="mt-4 text-center text-sm text-zinc-500">
        {`Don't have an account? `}
        <Link href="/signup">Sign Up</Link>
      </p>
    </main>
  );
}
