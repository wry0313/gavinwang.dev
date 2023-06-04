import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head';
import Date from '../../components/Date'

import Link from 'next/link'
import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import MDXComponents from "../../components/markdown/MDXComponents";
import TableOfContents from '../../components/markdown/TableOfContents';

import { animated } from 'react-spring';
import useBoop from '../../hooks/useBoop';

import ScrollTopAndComment from '../../components/ScrollTopAndComment';

import Giscus from '@giscus/react';




export async function getStaticProps({ params }) {

    const postData = await getPostData(params.id);
    // console.log(postData)
    return {
        props: {
            ...postData
        }
    }
}

export default function Post({ source, data, wordCount, readTime, headings }) {
    const Content = useMemo(() => getMDXComponent(source), [source]);

    const [style, trigger] = useBoop({ rotation: 10, timing: 80 });
    return (
        <div className="max-w-[72rem] mx-auto py-10 px-5">
            <Head>
                <title>{data.title}</title>
                <link rel="shortcut icon" href="/images/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="text-[3.4rem] leading-[1.3] font-extrabold text-sky-900">{data.title}</h1>
            <hr className="h-[3.5px] my-2 bg-slate-300"></hr>
            <div className="flex flex-col">
                <div id="article-by-content-table" className=" flex flex-row">
                    <div id="left section">

                        <div id="article data" className="flex align-center text-base mb-8 text-slate-800 space-x-3">
                            <Date dateString={data.date} />
                            <div>{wordCount} words </div>
                            <div>{readTime} min read </div>
                        </div>
                        <article className='prose'>
                            <Content components={MDXComponents}></Content>
                        </article>
                        <div id="comment" className="mt-10 mb-2">
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

                    <div id="right section" className='max-w-[30%] ml-[4rem] mt-4'>
                        <div className='sticky top-10 space-y-4'>
                            <TableOfContents headings={headings} />
                            <ScrollTopAndComment />
                        </div>

                    </div>
                    
                </div>
                
                <div>
                    
                    <animated.div className="mb-[8rem] mt-[2rem] inline-block" style={style} onMouseEnter={trigger}>
                        <Link className="text-sky-900 font-bold text-xl" href="/">🔙 Back</Link>
                    </animated.div>
                </div>
            </div>
        </div>
    );
}


export async function getStaticPaths() {
    // Return a list of possible value for id
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    }
}

