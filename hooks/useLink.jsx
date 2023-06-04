import React from "react";
import { useRouter } from "next/router";

const useLink = () => {
  const router = useRouter();
  const [currentpath, setCurrentPath] = React.useState(
    undefined
  );
  const [slug, setSlug] = React.useState(
    undefined
  );
  const basepath = router.asPath.split("#")[0];
  React.useEffect(() => {
    setSlug(router.query.slug);
    setCurrentPath(router.pathname);
  }, []);
  return {
    basepath: basepath,
    pathname: currentpath,
    query: {
      slug: slug
    }
  };
};

export default useLink;
