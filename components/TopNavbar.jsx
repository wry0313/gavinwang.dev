import React from "react";
import BlueGitHubButton from "./BlueGithubButton";
import BlueTwitterButton from "./BlueTwitterButton";
import BlueSpotifyButton from "./BlueSpotifyButton";
import BluePlayButton from "./BluePlayButton";
import Link from "next/link";
import { animated } from 'react-spring';
import useBoop from '../hooks/useBoop';

export default function TopNavbar() {
    const [style1, trigger1] = useBoop({ rotation: 5 });
    const [style2, trigger2] = useBoop({ rotation: 5 });

    return (
        <nav className="fixed content-center top-0 left-0 right-0 space-x-6 flex flex-row bg-transparent backdrop-blur-[3px] backdrop-saturate-[2] py-2 pl-2 z-10">

            <animated.span style={style1} onMouseEnter={trigger1}>
                <Link href="/" className="transition duration-300 text-sky-500 font-bold text-xl">
                    ~/blogs
                </Link>
            </animated.span>

            <animated.span style={style2} onMouseEnter={trigger2}>
                <Link href="/" className="transition duration-300 text-sky-500 font-bold text-xl">
                    ~/projects
                </Link>
            </animated.span>


            <BlueGitHubButton  />
            <BlueTwitterButton  />
            <BlueSpotifyButton  />
            <BluePlayButton soundUrl={"/audios/minecraft-soundtrack.mp3"} ></BluePlayButton>
        </nav>
    );
}
