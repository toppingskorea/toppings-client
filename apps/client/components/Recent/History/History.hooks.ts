import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  useCurrentHabitTitleSetter,
  useCurrentSelectCategorySetter,
  useCurrentSelectKeywordSetter
} from "~/recoil/atoms";
import {
  Keys,
  useDeleteRecentHistory,
  useFetchRecentHistories
} from "~/server/recent";
import { habitTitleChecker } from "~/utils";

const useHistory = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const setCurrentSelectKeyword = useCurrentSelectKeywordSetter();
  const setCurrentSelectCategory = useCurrentSelectCategorySetter();
  const setCurrentHabitTitle = useCurrentHabitTitleSetter();
  const { data: recentHistories } = useFetchRecentHistories();
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

  return {
    recentHistories,
    deleteRecentHistoryMutate,
    historyClickHandler
  };
};

export default useHistory;
