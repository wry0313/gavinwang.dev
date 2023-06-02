import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/Date';
import Typing from '../components/Typing';
import GitHubButton from '../components/GitHubButton';

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
      <div className="fixed top-2 right-2">
  <GitHubButton className=""></GitHubButton>
</div>
      <section className="front-page-card hover:bg-transparent hover:backdrop-blur-sm hover:text-white">
        <h1 className="text-[2.2rem] md:text-[4.2rem] font-bold flex">
          🧑‍💻<Typing text="gavinwang.dev" speed="400" />
        </h1>
        <p className="inline">Hi there! </p>
        <div className="inline-block animate-wiggle text-[1.5rem]"> 👋 </div>
        <p className="inline"> My name is Gavin and I'll be sharing what I've learned about machine learning 🎛️, web dev 🌐, and all things about coding 💻 on this blog site ✍️</p>
      </section>

      <section className=" p-2 mt-4 front-page-card">
        <h2 className="text-[1.5rem] leading-[1.4]">📠 Blogs</h2>
        <ul className="list-none">
          {allPostsData.map((post) => (
            <li className="mt-[1.25rem]" key={post.id}>
              <Link className="text-lapis" href={`/posts/${post.id}`}>
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

      <section className="mt-4 p-2 front-page-card">
        <h2 className="text-[1.5rem] leading-[1.4]">💾 Project Demos</h2>
        <ul className="list-none">
          <li className="mt-[1.25rem] leading-2">
            <Link className="text-lapis" href="/dog">
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
