import { useEffect } from "react";
import { useHeaderStore } from "~/stores/common";
import type { HeaderInitialState } from "~/stores/common/header/header.types";

const useSetHeader = (content: HeaderInitialState["content"]) => {
  const dispatchHeader = useHeaderStore(state => state.dispatchHeader);

  useEffect(() => {
    dispatchHeader(content);
  }, [content, dispatchHeader]);
};

export default useSetHeader;
