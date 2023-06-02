import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head';
import Date from '../../components/date'
import ReactMarkdown from "react-markdown"
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {oneLight} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';



export default function Post({ content, data, wordCount, readTime }) {
    return (
        <Layout article>
            <Head>
                <title>{data.title}</title>
            </Head>

            <div>
                <h1 className="text-[2rem] leading-[1.3] font-extrabold text-sky-900">{data.title}</h1>
                <hr className="h-[3.5px] my-2 bg-slate-300"></hr>
                <div className="flex text-base mb-8 text-slate-500">
                    <Date dateString={data.date} />
                    <p className="ml-6"> {wordCount} words</p>
                    <p className="ml-6"> {readTime} min read</p>
                </div>

                <ReactMarkdown className="prose"
                    children={content}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        code({node, inline, className, children, ...props}) {
                          const match = /language-(\w+)/.exec(className || '')
                          return !inline && match ? (
                            <SyntaxHighlighter
                              {...props}
                              children={String(children).replace(/\n$/, '')}
                              style={oneLight}
                              language={match[1]}
                              PreTag="div"
                            />
                          ) : (
                                 <code {...props} className="text-cyan-900 bg-zinc-100 shadow-xs rounded-lg p-1">
                              {children}
                            </code>
                          )
                        },

                        img: function ({ ...props }) {
                            const substrings = props.alt?.split('{{');
                            const alt = substrings[0].trim();
                
                            const width = substrings[1] ? substrings[1].match(/(?<=w:\s?)\d+/g)[0] : 800;
                            const height = substrings[1] ? substrings[1].match(/(?<=h:\s?)\d+/g)[0] : 400;
                            return (
                                <span className="flex justify-cente hover:scale-110 duration-300">
                                <Image
                                  className="mx-auto shadow" // Add the mx-auto class to center the image horizontally
                                  src={props.src}
                                  alt={alt}
                                  width={width}
                                  height={height}
                                />
                              </span>
                            )
                        },

                      }}                  
                />
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    }
}

//getStaticProps is given params, which contains id (because the file name is [id].js).
export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const postData = await getPostData(params.id);
    return {
        props: {
            ...postData
        }
    }
}