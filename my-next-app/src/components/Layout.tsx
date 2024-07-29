import React from "react";
import { Header } from "./Header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark:bg-gray-800 bg-slate-200 flex justify-center align-middle h-screen dark:text-black text-white">
      <section className="w-custom h-screen flex flex-col align-middle  relative">
        <Header />
        {children}
      </section>
    </div>
  );
}
