import React from "react";
import { ThemeButton } from "../components/ThemeButton";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-red-50 h-screen w-screen flex justify-center">
      <div className="bg-red-200 relative w-custom">
        <ThemeButton />
        {children}
      </div>
    </div>
  );
}
