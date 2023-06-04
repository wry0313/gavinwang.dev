import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head';
import Date from '../../components/Date'

import Link from 'next/link'
import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import MDXComponents from "../../components/markdown/MDXComponents";

import { animated } from 'react-spring';
import useBoop from '../../hooks/useBoop';

// return {
//     code, frontmatter
//     // wordCount, 
//     // readTime
//     };
// };
export async function getStaticProps({ params }) {

    const postData = await getPostData(params.id);
    // console.log(postData)
    return {
        props: {
            ...postData
        }
    }
}

export default function Post({ source, data, wordCount, readTime}) {
    const Content = useMemo(() => getMDXComponent(source), [source]);
    const [style, trigger] = useBoop({ rotation: 20 });
    return (
        <Layout>
            <Head>
                <title>{data.title}</title>
            </Head>
            <div className="px-5">
            <article id="article" >
                <h1 className="text-[2.6rem] leading-[1.3] font-extrabold text-sky-900">{data.title}</h1>
                <hr className="h-[3.5px] my-2 bg-slate-300"></hr>
                <div className="flex text-base mb-8 text-slate-800 space-x-3">
                    <Date dateString={data.date} />
                    <div>{wordCount} words </div>
                    <div>{readTime} min read </div>
                </div>
                <div className='prose'>
                    <Content components={MDXComponents}></Content>
                </div>
            </article>
            <animated.span style={style} onMouseEnter={trigger}>

            <Link className="block mt-[2rem] mb-[8rem] text-sky-900 font-bold" href="/">🔙 Back</Link>

            </animated.span>
        </div>
        </Layout>
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
