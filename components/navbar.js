import React from "react";
import GitHubButton from "./github-button";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="invisible lg:visible fixed left-0 bg-transparent backdrop-blur-sm backdrop-saturate-[0.9] flex flex-col items-start justify-center h-screen py-4 px-4">
            <div>
                <Link href="" className="block group transition duration-300 text-stone-100 font-bold text-xl mb-6"> ~/blogs
                    <span class="block max-w-0 group-hover:max-w-[5.5ch] transition-all duration-500 h-[0.2rem] rounded bg-stone-100"></span>
                </Link>
                <Link href="" className="block group text-stone-100 font-bold text-xl mb-6"> ~/projects
                    <span class="block max-w-0 group-hover:max-w-[7ch] transition-all duration-500 h-[0.2rem] rounded bg-stone-100"></span>
                </Link>
                <GitHubButton />

            </div>
        </nav>
    );
}
