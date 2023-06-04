import CodeBlock from './CodeBlock.jsx'
import ImageMarkdown from './Image.jsx'

const MDXComponents = {
    img: ImageMarkdown,
    code: CodeBlock,
  };
  
  export default MDXComponents;
  

//   code({node, inline, className, children, ...props}) {
//     const match = /language-(\w+)/.exec(className || '')
//     return !inline && match ? (
//       <SyntaxHighlighter
//         {...props}
//         children={String(children).replace(/\n$/, '')}
//         style={oneLight}
//         language={match[1]}
//         PreTag="div"
//       />
//     ) : (
//            <code {...props} className="text-cyan-900 bg-zinc-100 shadow-xs rounded-lg p-1">
//         {children}
//       </code>
//     )
//   },