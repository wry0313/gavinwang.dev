import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head';
import Date from '../../components/date'
import TwitterShare from '../../components/share_buttons'

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className="text-[2rem] leading-[1.3] font-extrabold">{postData.title}</h1>
                <hr className="h-1 my-2 bg-gray-200 rounded"></hr>
                <div className="text-xs font-bold mb-8">
                    <Date dateString={postData.date} />
                </div>

                <div className="prose" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
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
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    }
}