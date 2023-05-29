import Head from 'next/head';
import Link from 'next/link';

export const siteTitle = 'gavinwang.dev';

export default function Layout({ children, home }) {
  return (
    <div className="max-w-[38rem] my-[1rem] px-[1rem] mx-auto">
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

      <main>{children}</main>

      {!home && (
        <div className="mt-[3rem]">
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
