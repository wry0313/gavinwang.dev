import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { bundleMDX } from "mdx-bundler";


const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.mdx$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        // const contentWithoutCodeBlocks = fileContents.replace(/```[\s\S]*?```/g, '');
        // // Use gray-matter to parse the psot metadata section
        // const {data } = matter(fileContents);
        // const wordCount = contentWithoutCodeBlocks.split(/\s+/).length;
        // const wordsPerMinute = 200; // Adjust as needed
        // const readTime = Math.ceil(wordCount / wordsPerMinute);
        const { data } = matter(fileContents);
        // Combine the data with the id
        return {
            id,
            // wordCount,
            // readTime,
            // content,
            ...data,
        };
    });
    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    })
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.mdx$/, ''),
            },
        };
    });
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // console.log(content)
    const { code: mdxSource } = await bundleMDX({
        source: content,
        xdmOptions(options) {
          options.remarkPlugins = [...(options?.remarkPlugins ?? []), remarkGfm];
          options.rehypePlugins = [...(options?.rehypePlugins ?? [])];
          return options;
        },
      });
    // const contentWithoutCodeBlocks = fileContents.replace(/```[\s\S]*?```/g, '');
    // const wordCount = contentWithoutCodeBlocks.split(/\s+/).length;
    // const wordsPerMinute = 200; // Adjust as needed
    // const readTime = Math.ceil(wordCount / wordsPerMinute);
    // console.log("source:", mdxSource)
    // console.log('data', data)
    return {
        source: mdxSource
        , data
        // wordCount, 
        // readTime
        };
    };


