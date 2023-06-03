import React, { useEffect, useState } from 'react';

export default function Typing({ words, speed }) {
    const [displaytext, setDisplayText] = useState('');
    const [forward, setForward] = useState(true);
    const [wordIdx, setWordIdx] = useState(0)
    const [currentText, setCurrentText] = useState(words[0]);
    const [idx, setIdx] = useState(0)
    useEffect(() => {

        const type = () => {
            if (wordIdx < words.length) {

                if (idx < currentText.length) {

                    setTimeout(() => {
                        setIdx(prevIdx => prevIdx + 1)
                        setDisplayText(prevText => prevText + currentText[idx])
                    }, (Math.random() * 0.7 + 0.3) * speed);
                } else {
                    setTimeout(() => {
                        setForward(false);
                    }, 3000)
                }
            }
        }
        const backspace = () => {
            if (idx > 0) {
                setTimeout(() => {
                    setIdx(prevIdx => prevIdx - 1)
                    setDisplayText(prevText => prevText.slice(0, -1))
                }, 70);
            } else {
                setTimeout(() => {
                    setForward(true);
                    if (wordIdx+1 < words.length) {
                        setWordIdx(wordIdx + 1)
                        setCurrentText(words[wordIdx+1])
                    } else {
                        setWordIdx(0)
                        setCurrentText(words[0])
                    }
                }, 2500)
            }
        }


        if (forward) {
            type();
        } else {
            backspace();
        }

    }, [displaytext, forward]);

    return (
        <div className="flex items-center">
            <h1>{displaytext}</h1>
            <span className={`border-white h-[4rem] border-r-[2.5px] md:border-r-[3px] border-solid border-black ${displaytext.length === currentText.length | displaytext.length === 0 ? 'animate-caret' : ''}`}></span>
        </div>
    );
}
