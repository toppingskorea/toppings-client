import { useTheme } from "@emotion/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useSetNavigation } from "~/hooks";
import { useResetRecentRecoilState } from "~/hooks/map";
import {
  useCurrentSelectCategoryValue,
  useCurrentSelectKeywordValue,
  useSearchByFilteringValue
} from "~/recoil/atoms";
import { useUploadRecentHistory } from "~/server/recent";

const useViewList = () => {
  const currentSelectKeyword = useCurrentSelectKeywordValue();

  useSetNavigation({
    top: {
      marginBottom: currentSelectKeyword ? 45 : 0
    },
    bottom: true
  });

  const { colors, zIndex } = useTheme();
  const { push, back, replace } = useRouter();
  const searchByFiltering = useSearchByFilteringValue();
  const currentSelectCategory = useCurrentSelectCategoryValue();
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
    executeResetAll();

    replace("/map");
  };

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
