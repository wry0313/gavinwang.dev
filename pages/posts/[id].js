import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/Date";
import { Nunito } from "next/font/google";
const nunito = Nunito({ subsets: ["latin"] });

import Link from "next/link";
import { useMemo, useRef } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import MDXComponents from "../../components/markdown/MDXComponents";
import TableOfContents from "../../components/markdown/TableOfContents";

import { animated } from "react-spring";
import useBoop from "../../hooks/useBoop";

import ScrollTopAndComment from "../../components/ScrollTopAndComment";

import Giscus from "@giscus/react";

import TopNavbar from "../../components/TopNavbar";

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  // console.log(postData)
  return {
    props: {
      ...postData,
    },
  };
}

export default function Post({ source, data, wordCount, readTime, headings }) {
  const Content = useMemo(() => getMDXComponent(source), [source]);

  const comment = useRef();
  const scrollToComment = () => {
    comment.current.scrollIntoView();
  };

  const [style, trigger] = useBoop({ rotation: 10, timing: 80 });
  return (
    <>

     <TopNavbar/>

      <div className="overflow-hidden max-w-[72rem] mx-auto py-[0.3rem] px-5">
        <Head>
          <title>{data.title}</title>
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicon-16x16.png"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 className="border-b-2 mb-2 text-[2rem] md:text-[2.5rem] lg:text-[3.4rem] leading-[1.3] font-extrabold text-blue-900">
          {data.title}
        </h1>
        
        <div className="flex flex-col">
          <div id="article-by-content-table" className=" flex flex-row">
            <div id="left section">
              <div
                id="article data"
                className={`mb-2 flex align-center text-base text-emerald-800 space-x-2 ${nunito.className}`}
              >
                <Date dateString={data.date} />
                <p>·</p>
                <div>{readTime} min read </div>
              </div>
              <div id="author section" className={`flex flex-row ${nunito.className}`}>
                <div className="mr-2 flex items-center justify-center w-10 h-10 rounded-full bg-sky-300 text-white">
                    GW
                </div>
                <div className="mb-4  flex flex-col">
                    <p>Gavin Wang</p>
                    <small className="text-[0.7rem]">Software Developer</small>
                </div>
              </div>
              <article className="prose">
                <Content components={MDXComponents}></Content>
              </article>
              <div ref={comment} className="mt-10 mb-2">
                <Giscus
                  id="comments"
                  repo="wry0313/gavinwang.dev"
                  repoId="R_kgDOJdYNaA"
                  category="General"
                  categoryId="DIC_kwDOJdYNaM4CW-BH"
                  mapping="pathname"
                  term="Welcome to @giscus/react component!"
                  reactionsEnabled="1"
                  emitMetadata="0"
                  inputPosition="top"
                  theme="light"
                  lang="en"
                  loading="lazy"
                />
              </div>
            </div>

            <div id="right section" className="invisible md:visible max-w-[30%] md:ml-[4rem] mt-2">
              <div className="sticky top-[4rem] space-y-4 z-20 ">
                <TableOfContents headings={headings} />
                <ScrollTopAndComment handleClick={scrollToComment} />
              </div>
            </div>

            
          </div>

          <div>
            <animated.div
              className="mb-[8rem] mt-[2rem] inline-block"
              style={style}
              onMouseEnter={trigger}
            >
              <Link className="text-sky-900 font-bold text-xl" href="/">
                🔙 Back
              </Link>
            </animated.div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
