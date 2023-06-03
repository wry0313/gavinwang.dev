import Head from 'next/head';
import Link from 'next/link';
import ParticlesNeural from "./particle-neural";
import ParticlesLinks from './particle-links';
import ParticlesExp from './particles-experiment';
import Navbar from './navbar';

import {useState} from 'react'

export const siteTitle = 'gavinwang.dev Personal Developer Blog Site';

export default function Layout({ children, home }) {
  const [background, setBackground] = useState(true)

  const changeBackground = () => {
    setBackground(prevBackground => !prevBackground)
  }

  return (
    <div onClick={changeBackground} id="background-div" className={home ? 'gradient-animation' : ''}>
      {home && (background ? <ParticlesNeural /> : <ParticlesLinks />)}
      {home && <Navbar />}
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="gavin wang personal developer blog site with blogs on machine learning, web development, and project showcases"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      
      <div className="relative max-w-[48rem] mx-auto text-[19px] py-10">
      <main >{children}</main>

      {!home && (
        <div className="mt-[2rem] mb-[8rem] inline-block hover:scale-110 duration-300">
         <Link className="text-sky-700" href="/">🔙 Back to home</Link>
        </div>
      )}
    </div>
    </div>
  );
}
