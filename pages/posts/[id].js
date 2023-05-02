import Layout from '../../components/layout';
import { getAllPostIds , getPostData } from '../../lib/posts'
import Head from 'next/head';
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className="text-[2rem] leading-[1.3] font-extrabold tracking-[-0. my-4">{postData.title}</h1>
            <div className="text-gray-600">
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
  
export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    }
}