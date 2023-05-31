import Head from 'next/head';
import Link from 'next/link';

export const siteTitle = 'gavinwang.dev';

export default function Layout({ children, home }) {
  return (
    <div className="max-w-[42rem] py-[1rem] px-[1rem] mx-auto text-[18px]">
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="gavin wang personal dev site"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>

      <main >{children}</main>

      {!home && (
        <div className="mt-[2rem] mb-[8rem] hover:scale-110 duration-300">
          <Link className="text-[#0070f3] bg-[#F5F7F7] p-2 rounded-lg shadow" href="/">🔙 Back to home</Link>
        </div>
      )}
    </div>
  );
}
