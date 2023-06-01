import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head';
import Date from '../../components/date'
import ReactMarkdown from "react-markdown"
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {oneLight} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import rehypeRaw from 'rehype-raw';


export default function Post({ content, data, wordCount, readTime }) {
    return (
        <Layout>
            <Head>
                <title>{data.title}</title>
            </Head>

            <div>
                <h1 className="text-[2rem] leading-[1.3] font-extrabold">{data.title}</h1>
                <hr className="h-[3.5px] my-2 bg-gray-200 rounded"></hr>
                <div className="flex text-sm font-medium mb-8">
                    <Date dateString={data.date} />
                    {/* <p className="ml-6"> {wordCount} words</p>
                    <p className="ml-6"> {readTime} min read</p> */}
                </div>

                <ReactMarkdown className="prose prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-pre:bg-transparent prose-pre:p-0"
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
                            <code {...props} className={className}>
                              {children}
                            </code>
                          )
                        }
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