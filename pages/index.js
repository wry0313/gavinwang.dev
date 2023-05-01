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
        <p>Hello! I'm Gavin Wang. I will be using this website to write about what I learned in ML!</p>
        <Link href="/about_me">about me</Link>

      </section>
    </Layout>
  );
}
