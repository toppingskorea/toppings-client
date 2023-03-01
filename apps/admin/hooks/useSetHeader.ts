import { useEffect } from "react";
import { useHeaderStore, type HeaderInitialState } from "~/stores/common";

const useSetHeader = (content: HeaderInitialState["content"]) => {
  const dispatchHeader = useHeaderStore(state => state.dispatchHeader);

  useEffect(() => {
    dispatchHeader(content);
  }, [content, dispatchHeader]);
};

export default useSetHeader;
