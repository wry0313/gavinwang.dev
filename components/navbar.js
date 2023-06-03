import React from "react";
import GitHubButton from "./github-button";
import TwitterButton from "./twitter-button";
import Link from "next/link";

import { animated } from 'react-spring';
import useBoop from '../hooks/useBoop';

export default function Navbar() {
    const [style1, trigger1] = useBoop({ rotation: 5 });
    const [style2, trigger2] = useBoop({ rotation: 5 });


    return (

        <nav className="invisible lg:visible fixed left-0 bg-transparent backdrop-blur-sm backdrop-saturate-[0.9] flex flex-col items-start justify-center h-screen py-4 px-4 space-y-6">
            <animated.span style={style1} onMouseEnter={trigger1}>
            <Link href="" className="block group transition duration-300 text-stone-100 font-bold text-xl "> ~/blogs
                <span class="block max-w-0 group-hover:max-w-[5.5ch] transition-all duration-500 h-[0.2rem] rounded bg-stone-100"></span>
            </Link>

            </animated.span>
            <animated.span style={style2} onMouseEnter={trigger2}>

            <Link href="" className="block group text-stone-100 font-bold text-xl "> ~/projects
                <span class="block max-w-0 group-hover:max-w-[7ch] transition-all duration-500 h-[0.2rem] rounded bg-stone-100"></span>
            </Link>
            </animated.span>
            <GitHubButton />
            <TwitterButton />


        </nav>
    );
}
