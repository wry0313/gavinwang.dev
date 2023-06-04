import Head from 'next/head';
import ParticlesNeural from "../components/ParticlesNeural";
import ParticlesLinks from '../components/ParticleLinks';
import ParticlesParallax from '../components/ParticlesParallax';
import ParticlesAmongUs from '../components/ParticlesAmongus';
import Navbar from '../components/SideNavbar';
import { useState } from 'react';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/Date';
import Typing from '../components/Typing';


const siteTitle = 'Gavin Wang Personal Developer Blog Site';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const [backgroundIdx, setBackgroundIdx] = useState(0);
  const backgrounds = ['ParticlesNeural', 'ParticlesParallax', 'ParticlesLinks', 'ParticlesAmongUs'];
  const maxIdx = backgrounds.length - 1;


  const changeBackground = () => {
    if (backgroundIdx < maxIdx) {
      setBackgroundIdx(backgroundIdx + 1);
    } else {
      setBackgroundIdx(0);
    }
  };

  return (
    <div onClick={changeBackground} id="background-div" className={(backgroundIdx === 0 || backgroundIdx === 2) ? 'gradient-animation' : ''}>
      {(backgroundIdx === 0 && <ParticlesNeural />)}
      {(backgroundIdx === 1 && <ParticlesParallax />)}
      {(backgroundIdx === 2 && <ParticlesLinks />)}
      {(backgroundIdx === 3 && <ParticlesAmongUs />)}

      <Navbar />
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
        <title>{siteTitle}</title>
        <meta
          name="description"
          content="gavin wang personal developer blog site with blogs on machine learning, web development, and project showcases"
        />
      </Head>

      <div className="relative max-w-[48rem] mx-auto text-[22px] py-10">

     

      <div id="homepage sections" className="px-4 md:px-0 w-[52rem] mx-auto py-4 ">
        <section className="select-none group  bg-transparent backdrop-blur-[3px] text-white bg-stone-100 shadow-md rounded-lg p-8 hover:scale-105 duration-300 animate-fadeIn">
          <h1 className="text-[2.2rem] md:text-[4.2rem] font-bold flex">
            🧑‍💻<Typing words={["gavinwang.dev", "machine learning", "web development", "mathematics", "journaling", "hmu on twitter :)"]} speed="300" />
          </h1>
          <section className="text-[1.6rem]">
            <p className="inline">Hi there! </p>
            <div className="inline-block animate-wiggle text-[1.5rem]"> 👋 </div>
            <p className="inline"> My name is Gavin and I'll be sharing what I've learned about machine learning 🎛️, web dev 🌐, and all things coding 💻 on this blog site ✍️</p>
          </section>
        </section>

        <section className="p-3 mt-4  bg-stone-100 shadow-md rounded-lg hover:scale-105 duration-300 animate-fadeIn">
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

        <section className="mt-4 p-3  bg-stone-100 shadow-md rounded-lg hover:scale-105 duration-300 animate-fadeIn">
          <h2 className="text-[1.5rem] leading-[1.4]">💾 Projects</h2>
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
      </div>
      </div>
    </div>
  );
}
