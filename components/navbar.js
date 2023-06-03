import React from "react";
import GitHubButton from "./github-button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="invisible lg:visible fixed left-0 bg-transparent backdrop-blur-sm backdrop-saturate-[0.9] flex flex-col items-start justify-center h-screen py-4 px-4">
      <div>
        <Link href="" className="block hover:bg-zinc-100 hover:shadow-xs hover:rounded-lg text-stone-100 font-bold text-xl mb-6"> ~/blogs </Link>
        <Link href="" className="block  text-stone-100 font-bold text-xl mb-6"> ~/projects </Link>
        <GitHubButton/>
        
      </div>
    </nav>
  );
}
