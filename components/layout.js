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
      
      <main>{children}</main>
      {!home && (
        <div className="mt-[3rem]">
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
