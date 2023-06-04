import CodeBlock from './CodeBlock.jsx'
import ImageMarkdown from './Image.jsx'
import AnchorLink from './AnchorLink.jsx';

const MDXComponents = {
    img: ImageMarkdown,
    code: CodeBlock,
    ...AnchorLink
  };
  
export default MDXComponents;