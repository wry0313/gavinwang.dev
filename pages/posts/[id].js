import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head';
import Date from '../../components/date'
import ReactMarkdown from "react-markdown"

export default function Post({ content, data }) {
    console.log(content, data);
    return (
        <Layout>
            <Head>
                <title>{data.title}</title>
            </Head>

            <div>
                <h1 className="text-[2rem] leading-[1.3] font-extrabold">{data.title}</h1>
                <hr className="h-1 my-2 bg-gray-200 rounded"></hr>
                <div className="text-xs font-bold mb-8">
                    <Date dateString={data.date} />
                </div>
                <ReactMarkdown className="prose prose-a:text-blue-600" children={content} />            
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

//getStaticProps is given params, which contains id (because the file name is [id].js).
export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const { content, data } = await getPostData(params.id);
    // console.log(postData)
    return {
        props: {
            content, data
        }
    }
}