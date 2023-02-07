import {
  useCurrentSelectCategoryState,
  useCurrentSelectKeywordState,
  useSearchByFilteringState
} from "@atoms/index";
import { useTheme } from "@emotion/react";
import { del, get, set } from "idb-keyval";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { indexedDBKeys } from "~/constants";
import { useSetNavigation } from "~/hooks";
import { useResetRecentRecoilState } from "~/hooks/map";
import { useUploadRecentHistory } from "~/server/recent";

const useViewList = () => {
  const [currentSelectKeyword, setCurrentSelectKeyword] =
    useCurrentSelectKeywordState();
  const [currentSelectCategory, setCurrentSelectCategory] =
    useCurrentSelectCategoryState();

  useSetNavigation({
    top: {
      marginBottom: currentSelectKeyword ? 45 : 0
    },
    bottom: true
  });

  const { colors, zIndex } = useTheme();
  const { push, back, replace } = useRouter();
  const [searchByFiltering, setSearchByFiltering] = useSearchByFilteringState();
  const { executeResetAll } = useResetRecentRecoilState();
  const { mutate: uploadRecentHistoryMutate } = useUploadRecentHistory();

  const restaurantCardClickHandler = useCallback(
    (item: Restaurant.SearchByFilteringDTO) => {
      uploadRecentHistoryMutate({
        type: "Filter",
        keyword: item.name,
        category: "Name",
        content: item.address,
        restaurantId: item.id
      });

      push(`/post/${item.id}`);
    },
    [push, uploadRecentHistoryMutate]
  );

  const exitClickHandler = () => {
    del("currentSelectKeyword");
    del("currentSelectCategory");
    executeResetAll();

    replace("/map");
  };

  useEffect(() => {
    if (searchByFiltering)
      set(indexedDBKeys.searchByFiltering, searchByFiltering);

    get(indexedDBKeys.searchByFiltering).then(setSearchByFiltering);
  }, [searchByFiltering, setSearchByFiltering]);

  useEffect(() => {
    if (currentSelectKeyword)
      set(indexedDBKeys.currentSelectKeyword, currentSelectKeyword);
    if (currentSelectCategory)
      set(indexedDBKeys.currentSelectCategory, currentSelectCategory);

    get(indexedDBKeys.currentSelectKeyword).then(value => {
      if (value) setCurrentSelectKeyword(value);
    });
    get(indexedDBKeys.currentSelectCategory).then(value => {
      if (value) setCurrentSelectCategory(value);
    });
  }, [
    currentSelectCategory,
    currentSelectKeyword,
    setCurrentSelectCategory,
    setCurrentSelectKeyword
  ]);

  return {
    currentSelectCategory,
    exitClickHandler,
    zIndex,
    colors,
    currentSelectKeyword,
    searchByFiltering,
    restaurantCardClickHandler,
    back
  };
};

export default useViewList;
