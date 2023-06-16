import Head from "next/head";
import Link from "next/link";

export default function Demo() {
  return (
    <div>
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
        <meta name="description" content="CopyGPT showcase" />
        <title>CopyGPT Demo</title>
      </Head>

      <div className="flex flex-col items-center animate-fadeIn text-[22px] py-10">
        <h1 className="w-[48rem] bg-[#F5F7F7] shadow rounded-lg text-center sm:text-[3.2rem] leading-[1.3] font-bold mb-4 px-4 py-2">
          💬 CopyGPT Demo
        </h1>

        <iframe
        className=""
          width="1280"
          height="720"
          src="https://www.youtube.com/embed/RE4HuNB__HQ"
        ></iframe>
        <Link className="text-lapis hover:underline my-8" href="https://github.com/wry0313/copyGPT/">github repo link</Link>
        <Link
          className="inline-block mb-[8rem] text-sky-900 font-bold"
          href="/"
        >
          🔙 Back
        </Link>

        
      </div>
    </div>
  );
}
