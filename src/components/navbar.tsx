"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-center gap-6">
      <Link href="/" className="hover:text-yellow-400">
        Enrollment Form
      </Link>
      <Link href="/new-form" className="hover:text-yellow-400">
        New Form
      </Link>
    </nav>
  );
}
