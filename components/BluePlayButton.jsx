import { useState, useEffect } from 'react';
import { animated } from 'react-spring';
import useBoop from '../hooks/useBoop';
import useSound from 'use-sound';

export default function PlayButton({ soundUrl }) {
  const [style, trigger] = useBoop({ rotation: -10 });
  const [play, { stop }] = useSound(soundUrl);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayerClick = () => {
    if (isPlaying) {
      stop();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (isPlaying) {
        stop();
      }
    };
  }, [isPlaying]);

  if (isPlaying) {
    // pause
    return (
      <animated.span style={style} onMouseEnter={trigger}>
        <svg
          className={`fill-sky-500 blur-[0.2px] h-5 w-5 sm:h-6 sm:w-6`}
          viewBox="0 0 60 60"
          onClick={handlePlayerClick}
        >
          <polygon points="0,0 15,0 15,60 0,60" />
          <polygon points="25,0 40,0 40,60 25,60" />
        </svg>
      </animated.span>
    );
  } else {
    // play
    return (
      <animated.span style={style} onMouseEnter={trigger}>
        <svg
          className={`fill-sky-500 blur-[0.2px] h-5 w-5 sm:h-6 sm:w-6`}
          viewBox="0 0 60 60"
          onClick={handlePlayerClick}
        >
          <polygon points="0,0 50,30 0,60" />
        </svg>
      </animated.span>
    );
  }
}
