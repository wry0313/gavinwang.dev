import Head from 'next/head';
import ParticlesNeural from "./ParticlesNeural";
import ParticlesLinks from './ParticleLinks';
import ParticlesParallax from './ParticlesParallax';
import ParticlesAmongUs from './ParticlesAmongus';
import Navbar from './Navbar';
import {useState} from 'react'


export const siteTitle = 'gavinwang.dev Personal Developer Blog Site';

export default function Layout({ children, home }) {
  const [backgroundIdx, setBackgroundIdx] = useState(0)
  const maxIdx = 3;

  const changeBackground = () => {
    if (backgroundIdx < maxIdx) {
      setBackgroundIdx(backgroundIdx+1)
    } else {
      setBackgroundIdx(0)
    }
  }

  return (
<div onClick={changeBackground} id="background-div" className={home && (backgroundIdx === 0 || backgroundIdx === 2) ? 'gradient-animation' : ''}>
      {home && (backgroundIdx === 0 && <ParticlesNeural /> )}
      {home && (backgroundIdx === 1 && <ParticlesParallax /> )}
      {home && (backgroundIdx === 2 && <ParticlesLinks /> )}
      {home && (backgroundIdx === 3 && <ParticlesAmongUs /> )}

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
      </Head>
      
      <div className="relative max-w-[48rem] mx-auto text-[19px] py-10">
      <main >{children}</main>

      
    </div>
    </div>
  );
}
