import fs, { read } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { bundleMDX } from "mdx-bundler";

import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm'; 

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
        const { data, content } = matter(fileContents);
        const contentWithoutCodeBlocks = content.replace(/```[\s\S]*?```/g, '');
        const wordCount = contentWithoutCodeBlocks.split(/\s+/).length;
        const wordsPerMinute = 200; // Adjust as needed
        const readTime = Math.ceil(wordCount / wordsPerMinute);
    
        // Combine the data with the id
        return {
            id,
            wordCount,
            readTime,
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


if (process.platform === 'win32') {
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    'node_modules',
    'esbuild',
    'esbuild.exe',
  )
} else {
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    'node_modules',
    'esbuild',
    'bin',
    'esbuild',
  )
}

    const { code: mdxSource } = await bundleMDX({
        source: content,
        mdxOptions(options) {
          options.remarkPlugins = [
            ...(options?.remarkPlugins ?? []), 
            remarkGfm,
        ];
          options.rehypePlugins = [
            ...(options.rehypePlugins ?? []),
            rehypeSlug,
          ];
          return options;
        },
        esbuildOptions(options) {
            options.outdir = path.join(
                process.cwd(),
                "public",
                "images",
                "posts",
                id
              );
            options.loader = {
              ...options.loader,
              ".png": "file",
              ".jpg": "file",
              ".jpeg": "file",
              ".mp4": "file",
            };
            options.publicPath = `/images/posts/${id}`;
            options.write = true;
            return options;
          },
      });
    const contentWithoutCodeBlocks = content.replace(/```[\s\S]*?```/g, '');
    const wordCount = contentWithoutCodeBlocks.split(/\s+/).length;
    const wordsPerMinute = 200; // Adjust as needed
    const readTime = Math.ceil(wordCount / wordsPerMinute);

    return {
        source: mdxSource, 
        data,
        wordCount, 
        readTime
        };
    };


