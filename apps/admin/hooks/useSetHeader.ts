import  { type useHeaderValue, useHeaderSetter } from "@atoms/header";
import { useEffect } from "react";

const useSetHeader = (content: ReturnType<typeof useHeaderValue>) => {
  const setHeader = useHeaderSetter();

  useEffect(() => {
    setHeader(content);
  }, [content, setHeader]);
};

export default useSetHeader;
