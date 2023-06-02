---
title: '📝 Complete Setup Guide for Markdown in Next.js Projetcs: Syntax Highlighting, HTML Elements'
date: '2023-06-02'
---

You know, Markdown is like the cool kid on the block when it comes to simple and efficient text formatting. It's all about keeping things easy and fun. 😎🚀

So mark your calendars 📅 for June 2nd, 2023, because we're diving deep into the world of Markdown. We'll explore how to set it up in your Next.js projects and additionally learn how to have syntax highlighting for code blocks and rehype HTML. Say goodbye to the hassle and hello to smooth sailing in your coding adventures! 🌟🌅

Say that you have a `fortnite_from_noob_to_master.md` and you want to display that onto your next.js or react.js project. How do you do that? 🤔

## Setting Up React-Markdown

Download the Node package `react-markdown`

```bash
npm install react-markdown
```
Let's test it out real quick! In your pages folder, make a new page called `md.js`
```js
import ReactMarkdown from 'react-markdown'

export default function Home() {
  return (
    <ReactMarkdown># Hello, *world*!</ReactMarkdown>
  )
}

```
run `npm run dev` and go to [http://localhost:3000/md](http://localhost:3000/md)
you should see this on your page:

<h1 className="no-css">Hello,<em>World</em>!</h1>
<style>
  .no-css {
    all: initial;
    font-size: 32px;
    font-weight: bold;
  }
</style>

3. make a `README.md` file in a new folder and call it posts. We will store all our markdown files in this folder. Copy and Paste this into your `README.md` file. 

~~~markdown
---
title: 'README.md'
date: '2023-06-02'
---

# Foobar

Foobar is a Python library for dealing with word pluralization.

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

```bash
pip install foobar
```

## Usage

```python
import foobar

# returns 'words'
foobar.pluralize('word')

# returns 'geese'
foobar.pluralize('goose')

# returns 'phenomenon'
foobar.singularize('phenomena')

~~~


**_NOTE:_** You might have noticed that each markdown file has a metadata section at the top containing title and date. This is called YAML Front Matter, which can be parsed using a library called gray-matter. 

```bash
npm install gray-matter
```


4. in order to dispaly `README.md`onto a page, we will use next.js dynamic routing. For more information refer to this [tutortial](https://nextjs.org/learn/basics/dynamic-routes).

Create a top-level directory called `lib` in the root directory. Then, inside `lib`, create a file called `posts.js`, and copy and paste this code:

```js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        data,
        content,
    };
};
```

In side the `pages` directory, create a sub directory called `posts`. Now, create a file called `[id].js` inside the `pages/posts` directory, and copy and paste this code:

```js
import { getAllPostIds, getPostData } from '../../lib/posts'
import ReactMarkdown from 'react-markdown'

export default function Post({ content, data }) {
    return (
        <> 
            <h1>{data.title}</h1>
            <p>{data.date}</p>
            <ReactMarkdown children={content} />
        </>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            ...postData
        }
    }
}
```

Now if you go to [http://localhost:3000/posts/README](http://localhost:3000/posts/README), you should see this: 🎊🥳

![react markdown showcase {{ w: 400, h: 400 }}](/article/react_markdown_showcase.png)

5. Now let's give the plain HTML some typographic defaults with the Tailwind CSS plugin [typography](https://tailwindcss.com/docs/typography-plugin). If you don't already have TailwindCSS😱, refer to this [setup guide](https://nextjs.org/docs/app/building-your-application/styling/tailwind-css).

```bash
npm install -D @tailwindcss/typography
```
In `tailwind.config.js`: 

```js 
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
```

Simply add the class `prose` to your `<ReactMarkdown>`component and now take a look 👀:
```js
 <ReactMarkdown className='prose' children={content} />
```
![tailwindcss markdown showcase {{ w: 400, h: 400 }}](/article/markdown_tailwind_showcase.png)


6. But you see, the code blocks aren't highlighted with syntax... Luckily, with `react-markdown`it is easy to apply syntax highlighting! Simply run

```bash
npm install react-syntax-highlighter
```

if you want to use Tailwind CSS inside your blog post: "./posts/**/*.{js,ts,jsx,tsx,md,mdx}"