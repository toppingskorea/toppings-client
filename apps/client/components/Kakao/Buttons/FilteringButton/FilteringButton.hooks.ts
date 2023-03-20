import { useCurrentSelectKeywordValue } from "@atoms/recent";
import { del } from "idb-keyval";
import { indexedDBKeys } from "~/constants";

import { useInternalRouter, useResetRecentRecoilState } from "~/hooks";
import { isLoggedIn } from "~/utils";

export const useKeywordBox = () => {
  const currentSelectKeyword = useCurrentSelectKeywordValue();
  const { executeResetAll } = useResetRecentRecoilState();

  const removeStatesHandler = () => {
    del(indexedDBKeys.currentSelectKeyword);
    del(indexedDBKeys.currentSelectCategory);
    executeResetAll();
  };

  return {
    currentSelectKeyword,
    removeStatesHandler
  };
};

export const useButtonClick = () => {
  const { push } = useInternalRouter();

  const pushByLoggedInHandler = () => {
    push(isLoggedIn() ? "/recent" : "/recent/filter/restaurant");
  };

  return {
    pushByLoggedInHandler
  };
};
