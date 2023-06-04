import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head';
import Date from '../../components/Date'



import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import MDXComponents from "../../components/markdown/MDXComponents";

// return {
//     code, frontmatter
//     // wordCount, 
//     // readTime
//     };
// };
export async function getStaticProps({ params }) {
    console.log('get static props')
    const postData = await getPostData(params.id);
    // console.log(postData)
    return {
        props: {
            ...postData
        }
    }
}

export default function Post({ source, data }) {
    const Content = useMemo(() => getMDXComponent(source), [source]);

    return (
        <Layout>
            <Head>
                <title>{data.title}</title>
            </Head>

            <div>
                <h1 className="text-[2rem] leading-[1.3] font-extrabold text-sky-900">{data.title}</h1>
                <hr className="h-[3.5px] my-2 bg-slate-300"></hr>
                <div className="flex text-base mb-8 text-slate-500">
                    <Date dateString={data.date} />

                </div>
                <div className='prose'>
                    <Content components={MDXComponents}></Content>
                </div>
               

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
