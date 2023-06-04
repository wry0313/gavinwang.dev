import Image from 'next/image';

const ImageMarkdown = (props) => {

  return (
    <span className="flex justify-cente hover:scale-[1.2] duration-300">
    <Image
    className="mx-auto w-max max-w-full" // Add the mx-auto class to center the image horizontally
    src={props.src}
    alt={props.alt}
    width={400}
    height={400}
  />
   </span>
  );
};
export default ImageMarkdown;
