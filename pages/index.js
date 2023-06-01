import Head from 'next/head';

import Layout from '../components/layout';
import Link from 'next/link';
import Date from '../components/date';
import TypewriterAnimation from '../components/typewriter_animation';


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
        <title>gavinwang.dev</title>
      </Head>
      <header className="flex flex-col bg-[#F5F7F7] shadow-md rounded-lg p-8 hover:scale-105 duration-300 animate-fadeIn">
      <h1 className="text-[2.2rem] md:text-[4.2rem] font-bold flex">
      🧑‍💻<TypewriterAnimation text="gavinwang.dev" speed="400" />
      </h1>
      <section id="self-introduction">
          <p className="inline">Hi there! </p>
          <div className="inline-block animate-wiggle text-[1.5rem]"> 👋 </div>
          <p className="inline"> My name is Gavin and I'll be sharing what I've learned about machine learning 🎛️, web dev 🌐, and all things about coding 💻 on this blog site ✍️</p>
        </section>
      </header>

      <section className="bg-[#F5F7F7] shadow-md rounded p-2 my-4 hover:scale-105 duration-300 animate-fadeIn">
        <h2 className="text-[1.5rem] leading-[1.4]">📠 Blogs</h2>
        <ul className="list-none">
          {allPostsData.map((post) => (
            <li className="mt-[1.25rem]" key={post.id}>
              <Link className="text-[#0070f3]" href={`/posts/${post.id}`}>
                {post.title}
              </Link>
              <br />
              <div className="text-gray-600 text-[0.95rem]">
                <Date dateString={post.date} />
                <div className="text-sm">
                  {post.wordCount} words {post.readTime} min read
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-[#F5F7F7] shadow-md rounded p-2 mt-4 hover:scale-105 duration-300 animate-fadeIn">
        <h2 className="text-[1.5rem] leading-[1.4]">💾 Project Demos</h2>
        <ul className="list-none">
          <li className="mt-[1.25rem] leading-2">
            <Link className="text-[#0070f3]" href="/dog">
              🐕 Dog vs. 🐈 Cat Classifier Demo
            </Link>
            <div className="text-gray-600 text-base">
              <Date dateString="2023-05-03" />
            </div>
            <p className="text-gray-600 text-base">
              Web hosted demo of a fine-tuned ResNet model: classifies uploaded images as cats or dogs with probability scores
            </p>
          </li>
        </ul>
      </section>
    </Layout>
  );
}
