import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import Link from 'next/link'
import Date from '../components/date';

import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="my-5">
        <p>Hi there! 👋 My name is Gavin and I'll be sharing what I've learned about machine learning, web dev, and all things coding on this blog site ✍</p>
        {/* <Link href="/about_me">Learn more about me!</Link> */}
      </section>

      <section>
        <h2 className="text-[1.5rem] leading-[1.4] my-4">📠 Blogs</h2>
        <u1 className="list-none">
          {allPostsData.map(post => (
            <li className="mb-[1.25rem]" key={post.id}>
              <Link href={`/posts/${post.id}`}> {post.title}</Link>
              <br />
              <div className="text-gray-600">
                <Date dateString={post.date} />
              </div>
            </li>
          ))}
        </u1>
      </section>

      <section>
        <h2 className="text-[1.5rem] leading-[1.4] my-4">💾 Project Demos</h2>
        <u1 className="list-none">
        <li className="mb-[1.25rem]">
              <Link href="Dog_Cat_Classifier_Demo"> Dog vs. Cat Classifier Demo</Link>
              <br />
              <div className="text-gray-600">
                <Date dateString="2023-05-03" />
              </div>
              
        </li>
        </u1>
      </section>
    </Layout>
  );
}
