import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  useCurrentHabitTitleValue,
  useCurrentSelectCategorySetter,
  useCurrentSelectKeywordSetter,
  useMapBoundsValue,
  useMapSearchByFilteringSetter
} from "~/recoil/atoms";
import {
  Keys,
  useDeleteRecentHistory,
  useFetchRecentHistories,
  useFetchRestaurantByCountry,
  useFetchRestaurantByEatingHabit
} from "~/server/recent";
import { habitTitleChecker } from "~/utils";

const useHistory = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const setCurrentSelectKeyword = useCurrentSelectKeywordSetter();
  const setCurrentSelectCategory = useCurrentSelectCategorySetter();
  const currentHabitTitle = useCurrentHabitTitleValue();
  const { data: recentHistories } = useFetchRecentHistories();
  const { mutate: deleteRecentHistoryMutate } = useDeleteRecentHistory({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: Keys.recent()
      });
    }
  });
  const setMapSearchByCountry = useMapSearchByFilteringSetter();
  const mapBounds = useMapBoundsValue();
  const { mutate: fetchRestaurantByEatingHabit } =
    useFetchRestaurantByEatingHabit({
      onSuccess: data => {
        setMapSearchByCountry(data);
      }
    });
  const { mutate: fetchRestaurantByCountryMutate } =
    useFetchRestaurantByCountry({
      onSuccess: data => {
        setMapSearchByCountry(data);
      }
    });

  const historyClickHandler = (
    category: Recent.HistoryDTO["category"],
    keyword: Recent.HistoryDTO["keyword"],
    restaurantId: Recent.HistoryDTO["restaurantId"]
  ) => {
    switch (category) {
      case "Name":
        push(`/post/${restaurantId}`);
        break;
      case "Habit":
        setCurrentSelectKeyword(keyword);
        fetchRestaurantByEatingHabit({
          habit: keyword,
          habitTitle: habitTitleChecker(keyword), // 기본 타이틀이 atom에 Diet로 되어 있으므로 TitleChecker를 사용합니다
          direction: mapBounds!
        });
        setCurrentSelectCategory(category);
        push("/map");
        break;
      default:
        setCurrentSelectKeyword(keyword);
        fetchRestaurantByCountryMutate({
          country: keyword,
          direction: mapBounds!
        });
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
