import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="{utilStyles.headingMd}">
        <p>Hello. I'm Gavin. Here is where I will be writing about what I learned in the field of machine learning!</p>
        <Link href="/about_me">Learn more about me!</Link>

      </section>
    </Layout>
  );
}
