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

    const [style3, trigger3] = useBoop({ rotation: 20 });
    return (
        <div className="relative max-w-[64rem] mx-auto py-10">
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
            <div className="px-5 flex flex-row">
                <div id="left section">

                    <div id="article data" className="flex align-center text-base mb-8 text-slate-800 space-x-3">
                        <Date dateString={data.date} />
                        <div>{wordCount} words </div>
                        <div>{readTime} min read </div>
                    </div>
                    <article className='prose'>
                        <Content components={MDXComponents}></Content>
                    </article>

                </div>

                <div id="left section" className='ml-[4rem] mt-4'>
                    <TableOfContents headings={headings} />
                </div>




            </div>
            <animated.span style={style3} onMouseEnter={() => { trigger3(); console.log('hey') }}>
                {/* WHY THE FUCK IS IT NOT WORKING */}
                <Link className="block mt-[2rem] mb-[8rem] text-sky-900 font-bold" href="/">🔙 Back</Link>
            </animated.span>
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
