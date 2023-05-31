import React, { useEffect, useState } from 'react';

export default function TypewriterAnimation(props) {
    const [currentText, setCurrentText] = useState('');
    const text = props.text;

    useEffect(() => {
        const typeWriter = (i) => {
            if (i < text.length) {
                setCurrentText(prevText => prevText + text[i]);
                setTimeout(() => {
                    typeWriter(i + 1);
                }, (Math.random() * 0.7 + 0.3) * 400);
            } else {
                setTimeout(() => {
                    deleteText(text.length);
                }, 2000);
            }
        };

        const deleteText = (i) => {
            if (i > 0) {
                setCurrentText(prevText => prevText.slice(0, -1));
                setTimeout(() => {
                    deleteText(i - 1);
                }, (Math.random() * 0.2 + 0.3) * 100);
            } else {
                setTimeout(() => {
                    typeWriter(0);
                }, 1500);
            }
        };

        typeWriter(0);
    }, []);

    return (
        <div className="flex items-center">
            <h1>{currentText}</h1>
            <span className={`h-[75%] border-r-[2.5px] md:border-r-[3px] border-solid border-black ${currentText.length === text.length | currentText.length === 0 ? 'animate-caret' : ''}`}></span>
        </div>
    );
}
