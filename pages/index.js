import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link'

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
      <section className="{utilStyles.headingMd}">
        <p>Hello. I'm Gavin. Here is where I will be writing about what I learned in the field of machine learning!</p>
        <Link href="/about_me">Learn more about me!</Link>

      </section>

      <section className={`${utilStyles.headingMD} ${utilStyles.padding1px} what`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <u1 className={utilStyles.list}>
          {allPostsData.map(post => (
            <li className={utilStyles.listItem} key={post.id}>
              {post.title}
              <br />
              {post.id}
              <br />
              {post.date}
            </li>
          ))}
        </u1>
      </section>
    </Layout>
  );
}
