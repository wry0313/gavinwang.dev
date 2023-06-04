import Link from "next/link";
import React, { forwardRef } from "react";
import useLink from "../../hooks/useLink";


const LinkBase = forwardRef(({ size, href, onClick }, ref) => {
  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      className={
        "absolute top-0 left-0 -translate-x-full transform p-1 !text-dark-400 !no-underline opacity-0 duration-75 focus:opacity-100 group-hover:opacity-100"
      }
    >
      <svg
        width={`${2.5 - 0.25 * size}rem`}
        height={`${2.5 - 0.25 * size}rem`}
        fill="none"
        stroke="gray"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
        />
      </svg>
    </a>
  );
});

const CustomLink = ({ anchor, size }) => {
  const link = useLink();

  return (
    <>
      {link.pathname && (
  <Link href={`${link.basepath}#${anchor}`}>
    <LinkBase size={size} />
  </Link>
)}

    </>
  );
};

const Heading = ({ size, children, id }) => {

  const Tag = `h${size}`;
  const DynamicHeading = ({ children, id, className }) =>
    React.createElement(Tag, { id, className }, children);

    
  return (
    <>
      <DynamicHeading id={id} className={"group sticky"}>
        <CustomLink anchor={id} size={size} />
        {children}
      </DynamicHeading>
    </>
  );
};

const AnchorLink = {
  h1: (props) => <Heading {...props} size={1} />,
  h2: (props) => <Heading {...props} size={2} />,
  h3: (props) => <Heading {...props} size={3} />,
  h4: (props) => <Heading {...props} size={4} />,
  h5: (props) => <Heading {...props} size={5} />,
  h6: (props) => <Heading {...props} size={6} />,
};

export default AnchorLink;
