import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const name = 'Gavin Wang';
export const siteTitle = 'gavinwang.dev';

export default function Layout({ children, home}) {
  return (
    <div className="max-w-[32rem] px-[1rem] my-[3rem] mx-auto">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="flex flex-col items-center">
        {home && (
          <>
            {/* <Image
              priority
              src="/images/profile.jpg"
              className="rounded-full"
              height={144}
              width={144}
              alt=""
            /> */}
            <h1 className="text-4xl md:text-7xl font-bold my-2">{siteTitle}</h1>
          </>
        )} 
        
       
      </header>
      <main>{children}</main>
      {!home && (
        <div className="mt-[3rem]">
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
