import {
  useCurrentHabitTitleSetter,
  useCurrentSelectCategorySetter,
  useCurrentSelectKeywordSetter
} from "@atoms/index";
import { useTheme } from "@emotion/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  Keys,
  useDeleteRecentHistory,
  useFetchRecentHistories
} from "~/server/recent";
import { habitTitleChecker } from "~/utils";

const useHistory = () => {
  const { dimensions, colors } = useTheme();
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const setCurrentSelectKeyword = useCurrentSelectKeywordSetter();
  const setCurrentSelectCategory = useCurrentSelectCategorySetter();
  const setCurrentHabitTitle = useCurrentHabitTitleSetter();

  const { data: recentHistories, fetchNextPage: recentHistoriesFetchNextPage } =
    useFetchRecentHistories();

  const { mutate: deleteRecentHistoryMutate } = useDeleteRecentHistory({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: Keys.recent()
      });
    }
  });

  const historyClickHandler = (
    category: string,
    keyword: string,
    restaurantId?: number
  ) => {
    switch (category) {
      case "Name":
        push(`/post/${restaurantId}`);
        break;
      case "Habit":
        setCurrentSelectKeyword(keyword);
        setCurrentHabitTitle(habitTitleChecker(keyword));
        setCurrentSelectCategory(category);
        push("/map");
        break;
      default:
        setCurrentSelectKeyword(keyword);
        setCurrentSelectCategory(category);
        push("/map");
    }
  };

  const onMoreRecentHistoryClickHandler = () => {
    recentHistoriesFetchNextPage();
  };

  return {
    recentHistories,
    onMoreRecentHistoryClickHandler,
    deleteRecentHistoryMutate,
    historyClickHandler,
    dimensions,
    colors,
    nextPageButtonHidden:
      recentHistories.pages[0].totalPage === recentHistories.pages.length
  };
};

export default useHistory;
