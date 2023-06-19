import Head from "next/head";
import ParticlesLinks from "../components/ParticleLinks";
import Navbar from "../components/SideNavbar";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/Date";
import Typing from "../components/Typing";
import Contact from "../components/ContactMeForm";

const siteTitle = "Gavin Wang Personal Developer Blog Site";

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
    <div className="gradient-animation scroll-behavior:smooth">
      <ParticlesLinks />

      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <link rel="icon" href="/favicon.ico" />
        <title>{siteTitle}</title>
        <meta
          name="description"
          content="gavin wang personal developer blog site with blogs on machine learning, web development, and project showcases"
        />
      </Head>

      <div id="background-div" className="relative mx-auto text-[18px] py-4">
        <Navbar />
        <div
          id="homepage sections"
          className="p-4 md:px-0 w-[28rem] sm:w-[44rem] lg:w-[54rem] mx-auto "
        >
          <section className="select-none group  bg-transparent backdrop-blur-[3px] text-white bg-stone-100 shadow-md rounded-lg p-8 hover:scale-105 duration-300 animate-fadeIn">
            <h1 className="text-[2.2rem] md:text-[4.2rem] font-bold flex">
              🧑‍💻
              <Typing
                words={[
                  "gavinwang.dev",
                  "machine learning",
                  "web devevelopment",
                  "mathematics",
                  "hmu on twitter :)",
                ]}
                speed="300"
              />
            </h1>
            <section className="text-[1.3rem] md:text-[1.5rem]">
              <p className="inline">Hi there! </p>
              <div className="inline-block animate-wiggle text-[1.5rem]">
                {" "}
                👋{" "}
              </div>
              <p className="inline">
                {" "}
                My name is Gavin and I'll be sharing what I've learned about
                machine learning, web dev 🌐, and all things coding on
                this blog site 
              </p>
            </section>
          </section>

          <section
            id="blogs-div"
            className="p-4 mt-4  bg-stone-100 shadow-md rounded-lg hover:scale-105 duration-300 animate-fadeIn"
          >
            <h2 className="select-none text-[1.5rem] leading-[1.4]">
              📠 Blogs
            </h2>
            <ul className="list-none">
              {allPostsData.map((post) => (
                <li className="mt-[1.25rem]" key={post.id}>
                  <Link className="text-lapis" href={`/posts/${post.id}`}>
                    {post.title}
                  </Link>
                  <br />
                  <div className="select-none text-stone-500 text-[0.95rem]">
                    <Date dateString={post.date} />
                    <div className="text-sm">
                      {post.wordCount} words {post.readTime} min read
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section
            id="projects-div"
            className="select-none mt-4 p-4  bg-stone-100 shadow-md rounded-lg hover:scale-105 duration-300 animate-fadeIn"
          >
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
                  Web hosted demo of a fine-tuned ResNet model: classifies
                  uploaded images as cats or dogs with probability scores
                </p>
              </li>

              <li className="mt-[1.25rem] leading-2">
                <Link
                  className="text-lapis"
                  href="/posts/chrom_extension_zero_to_one"
                >
                  👨‍🏫 GPT Mentor
                </Link>
                <div className="text-gray-600 text-base">
                  <Date dateString="2023-05-29" />
                </div>
                <p className="text-gray-600 text-base">
                  GPT Mentor is a chrome extension that tracks your website
                  usage, retrieves information on your current tabs, and
                  generates a productivity report using ChatGPT
                </p>
              </li>

              <li className="mt-[1.25rem] leading-2">
                <Link className="text-lapis" href="/copyGPT">
                  💬 CopyGPT
                </Link>
                <div className="text-gray-600 text-base">
                  <Date dateString="2023-06-16" />
                </div>
                <p className="text-gray-600 text-base">
                  CopyGPT is a web app that lets you to upload your imessage
                  chat history databse file and allows you to chat to a GPT-3
                  model that mimics your texting style. It's just like talking
                  to yourself! (only supports locally run considering the
                  sensitivity of uploading personal chat history)
                </p>
              </li>
            </ul>
          </section>
          <section className='mt-4 p-4  w-fit shadow-md rounded-lg hover:scale-105 duration-300 animate-fadeIn"'>
            <Contact></Contact>
          </section>
        </div>
      </div>
    </div>
  );
}
