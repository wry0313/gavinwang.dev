import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
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
        <p>Hello. I'm Gavin. Here is where I will be writing about what I learned in the field of machine learning!</p>
        <Link href="/about_me">Learn more about me!</Link>
      </section>

      <section>
        <h2 className="text-[1.5rem] leading-[1.4] my-4">Blog</h2>
        <u1 className={utilStyles.list}>
          {allPostsData.map(post => (
            <li className={utilStyles.listItem} key={post.id}>
              <Link href={`/posts/${post.id}`}> {post.title}</Link>
              <br />
              <div className="text-gray-600">
                <Date dateString={post.date} />
              </div>
            </li>
          ))}
        </u1>
      </section>
    </Layout>
  );
}
