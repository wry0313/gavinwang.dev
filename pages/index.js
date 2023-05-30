import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout'
import Link from 'next/link'
import Date from '../components/date'

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
      <header className="flex flex-col items-center bg-[#F5F7F7] shadow-md rounded-lg p-8 hover:scale-105  duration-300">
        <h1 className=" text-[2.2rem] md:text-[4.2rem] font-bold ">🧑‍💻  {siteTitle}</h1>
        <section className="mt-5">
          
          <p>Hi there! 👋 My name is Gavin and I'll be sharing what I've learned about machine learning 🎛️, web dev 🌐, and all things coding 💻 on this blog site ✍️</p>
          {/* <Link href="/about_me">Learn more about me!</Link> */}
        </section>
      </header>

      <section className='bg-[#F5F7F7] shadow-md rounded p-2 my-4 hover:scale-105  duration-300'>
        <h2 className="text-[1.5rem] leading-[1.4]">📠 Blogs</h2>
        <u1 className="list-none">
          {allPostsData.map(post => (
            <li className="mt-[1.25rem]" key={post.id}>
              <Link className="text-[#0070f3]" href={`/posts/${post.id}`}> {post.title}</Link>
              <br />
              <div className="text-gray-600 text-base">
                <Date dateString={post.date} />
                <div className='text-sm'>
                  {post.wordCount} words est. {post.readTime} minutes
                </div>
              </div>
            </li>
          ))}
        </u1>
      </section>

      <section className='bg-[#F5F7F7] shadow-md rounded p-2 mt-4 hover:scale-105  duration-300'>
        <h2 className="text-[1.5rem] leading-[1.4]">💾 Project Demos</h2>
        <u1 className="list-none">
          <li className="mt-[1.25rem] leading-2">
            <Link className="text-[#0070f3]" href="Dog_Cat_Classifier_Demo"> 🐕 Dog vs. 🐈 Cat Classifier Demo</Link>
            <div className="text-gray-600 text-base">
              <Date dateString="2023-05-03" />
            </div>
            <p className='text-gray-600 text-base'> Web hosted demo of a fine-tuned ResNet model: classifies uploaded images as cats or dogs with probability scores</p>
          </li>
        </u1>
      </section>
    </Layout>
  );
}
