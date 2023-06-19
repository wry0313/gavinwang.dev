import React from "react";
import BlueGitHubButton from "./BlueGithubButton";
import BlueTwitterButton from "./BlueTwitterButton";
import BlueSpotifyButton from "./BlueSpotifyButton";
import BluePlayButton from "./BluePlayButton";
import Link from "next/link";
import { animated } from "react-spring";
import useBoop from "../hooks/useBoop";

export default function TopNavbar() {
  const [style1, trigger1] = useBoop({ rotation: 5 });
  const [style2, trigger2] = useBoop({ rotation: 5 });
  const [style3, trigger3] = useBoop({ rotation: 5 });

  return (
    <nav className="shadow-md pl-2 md:pl-10 sticky top-0 left-0 right-0 flex items-baseline  bg-transparent backdrop-blur-[10px] p-1 pl-2 z-10">
     
        <animated.span
          style={style3}
          className="whitespace-nowrap text-[1.7rem] mr-6"
          onMouseEnter={trigger3}
        >
          🎛️{" "}
          <Link
            href="/"
            className="italic transition duration-300 text-blue-900 font-bold"
          >
            gw.dev
          </Link>
        </animated.span>

        <animated.span style={style1} onMouseEnter={trigger1}>
          <Link
            href="/#blogs-div"
            className="mr-6 transition duration-300 text-sky-500 font-bold text-xl"
          >
            ~/blogs
          </Link>
        </animated.span>

        <animated.span style={style2} onMouseEnter={trigger2}>
          <Link
            href="/#projects-div"
            className="transition duration-300 text-sky-500 font-bold text-xl"
          >
            ~/projects
          </Link>
        </animated.span>

      <div className="invisible xl:visible mr-4 space-x-6 ml-auto flex flex-row">
        <BlueGitHubButton />
        <BlueTwitterButton />
        <BlueSpotifyButton />
        <BluePlayButton
          soundUrl={"/audios/minecraft-soundtrack.mp3"}
        ></BluePlayButton>
      </div>
    </nav>
  );
}
