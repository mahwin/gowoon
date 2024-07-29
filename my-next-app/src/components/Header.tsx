import React, { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/router";
import Link from "next/link";

export function Header() {
  return (
    <nav className="bg-gray-200 w-full h-12 p-2 flex align-middle justify-start">
      <Link href={"/"}>
        <FaHome size={24} color={"#000"} />
      </Link>
    </nav>
  );
}
