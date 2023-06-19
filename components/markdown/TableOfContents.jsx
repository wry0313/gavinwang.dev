import React from "react";
import Link from "next/link";
import useLink from "../../hooks/useLink";
import useActiveAnchor from "../../hooks/useActiveAnchor";

export default function TableOfContents({ headings }) {
  const link = useLink();
  let id = 0;
  if (!headings.length) return null;
  const anchors = React.useMemo(
    () => headings.map((heading) => heading.anchor),
    [headings]
  );
  const activeAnchor = useActiveAnchor(anchors);
  console.log(activeAnchor);
  const activeStyle = "font-normal scale-105 duration-300 inline-block";
  const normalStyle = "font-light hover:font-normal hover:scale-105 duration-300 inline-block";
  return (
    <div className="border-l-2 border-gray-300 pl-3">
      <ul className="space-y-2">
        {/* <h2 className="mb-2 text-base font-bold uppercase tracking-wider">
          Table of Contents
        </h2> */}
        {headings.map(({ text, anchor, hashCount }) => {
          const indentStyle = hashCount === 3 ? { marginLeft: "1rem" } : {};
          return (
            <li key={id++} style={indentStyle}>
              <Link
                scroll={false}
                // className="hover:text-slate-900 text-[0.9rem]" 
                
                href={`${link.basepath}#${anchor}`}
              >
                <p className={`${
                  activeAnchor === anchor ? activeStyle : normalStyle
                }`}>
                  {text}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
