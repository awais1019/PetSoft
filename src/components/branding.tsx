import React from "react";
import H1 from "./h1";

export default function Branding() {
  return (
    <section>
      <H1>
        Pet
        <span className="font-semibold">Soft</span>
      </H1>
      <p className="opacity-80 text-lg">Manage your pet daycare with ease</p>
    </section>
  );
}
