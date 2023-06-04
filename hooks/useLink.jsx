import React from "react";
import { useRouter } from "next/router";

const useLink = () => {
  const router = useRouter();
  const [currentpath, setCurrentPath] = React.useState(
    undefined
  );
  const basepath = router.asPath.split("?")[0];
  React.useEffect(() => {
    console.log("updated", basepath)

    setCurrentPath(router.pathname);
  }, []);
  return {
    basepath: basepath,
    pathname: currentpath,
  };
};

export default useLink;
