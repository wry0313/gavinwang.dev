import React from "react";
import Link from "next/link";
import useLink from "../../hooks/useLink";
import ScrollTopAndComment from "../ScrollTopAndComment";

export default function TableOfContents({ headings }) {
  const link = useLink();
  let id = 0;
  if (!headings.length) return null;
  return (

      <ul className="space-y-3 bg-slate-50 rounded-lg p-4">
        <h2 className="mb-2 text-base font-bold uppercase tracking-wider">
          Table of Contents
        </h2>
        {headings.map(({ text, anchor, hashCount }) => {
          const indentStyle = hashCount === 3 ? { marginLeft: "1rem", listStyle: "disc" } : {};
          return (
            <li key={id++} style={indentStyle}>
              <Link className="hover:text-slate-500" href={`${link.basepath}#${anchor}`}>
                {text}
              </Link>
            </li>
          );
        })}
      </ul>

  );
}
