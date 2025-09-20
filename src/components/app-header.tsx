"use client";

import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Routes = [
  {
    name: "Dashboard",
    path: "/app/dashboard",
  },
  {
    name: "Account",
    path: "/app/account",
  },
];

export default function AppHeader() {
  const pathname = usePathname();
  return (
    <header className="flex items-center justify-between py-2 border-b border-white/10">
      <Logo />
      <nav>
        <ul className="flex gap-2 text-xs">
          {Routes.map((route) => (
            <li key={route.name}>
              <Link
                href={route.path}
                className={cn(
                  "text-white/70 px-2 py-1 rounded-sm hover:text-white focus:text-white transition",
                  {
                    "bg-black/10 text-white": pathname === route.path,
                  }
                )}
              >
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
