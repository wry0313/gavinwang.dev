import Image from 'next/image';

const ImageMarkdown = (props) => {

  return (
    <Image
    className="mx-auto w-max max-w-full" // Add the mx-auto class to center the image horizontally
    src={props.src}
    alt={props.alt}
    width={800}
    height={800}
  />
  );
};
export default ImageMarkdown;
