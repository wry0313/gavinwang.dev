import React from "react";
import GitHubButton from "./GithubButton";
import TwitterButton from "./TwitterButton";
import { animated } from 'react-spring';
import useBoop from '../hooks/useBoop';

import SpotifyButton from "./SpotifyButton";

import Link from "next/link";


export default function SideNavbar() {
    const [style1, trigger1] = useBoop({ rotation: 5 });
    const [style2, trigger2] = useBoop({ rotation: 5 });

    return (
        <nav className="shadow select-none invisible lg:visible fixed left-0 bg-transparent backdrop-blur-sm backdrop-saturate-[1.1] flex flex-col items-start justify-center h-screen py-4 px-4 space-y-6 ">

            <animated.span style={style1} onMouseEnter={trigger1}>
            <Link href="/#blogs-div" scroll={false} className="block group transition duration-300 text-stone-100 font-bold text-xl "> ~/blogs
                <span className="block max-w-0 group-hover:max-w-[5.5ch] transition-all duration-500 h-[0.2rem] rounded bg-stone-100"></span>
            </Link>
            </animated.span>
            
            <animated.span style={style2} onMouseEnter={trigger2}>
            <Link href="/#projects-div" scroll={false} className="block group text-stone-100 font-bold text-xl "> ~/projects
                <span className="block max-w-0 group-hover:max-w-[7ch] transition-all duration-500 h-[0.2rem] rounded bg-stone-100"></span>
            </Link>
            </animated.span>

            <GitHubButton />
            <TwitterButton />
            <SpotifyButton />
            {/* <PlayButton soundUrl={"/audios/minecraft-soundtrack.mp3"}></PlayButton> */}
        </nav>
    );
}
