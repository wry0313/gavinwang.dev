import Head from 'next/head';
import Link from 'next/link';

export const siteTitle = 'gavinwang.dev';

export default function Layout({ children, home}) {
  return (
    <div className="max-w-[32rem] px-[1rem] my-[3rem] mx-auto">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="gavin wang personal dev site"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className="flex flex-col items-center">
          {home && (
            <>
              <h1 className="text-5xl md:text-6xl font-bold my-2">🧑‍💻{siteTitle}</h1>
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
