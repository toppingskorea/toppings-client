import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { diets } from "~/constants/data/common";
import {
  useCurrentSelectCategorySetter,
  useCurrentSelectKeywordSetter,
  useMapBoundsValue,
  useMapSearchByCountrySetter
} from "~/recoil/atoms";
import {
  Keys,
  useDeleteRecentHistory,
  useFetchEatingHabitByFiltering,
  useFetchRecentHistory,
  useFetchRestaurantByCountry
} from "~/server/recent";

const useHistory = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const setCurrentSelectKeyword = useCurrentSelectKeywordSetter();
  const setCurrentSelectCategory = useCurrentSelectCategorySetter();
  const { data: recentHistories } = useFetchRecentHistory();
  const { mutate: deleteRecentHistoryMutate } = useDeleteRecentHistory({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: Keys.recent()
      });
    }
  });
  const setMapSearchByCountry = useMapSearchByCountrySetter();
  const mapBounds = useMapBoundsValue();
  const { mutate: fetchEatingHabitByFilteringMutate } =
    useFetchEatingHabitByFiltering({
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
    if (category === "Name") push(`/post/${restaurantId}`);
    else {
      setCurrentSelectKeyword(keyword);

      if (category === "Habit") {
        fetchEatingHabitByFilteringMutate({
          habit: keyword,
          habitTitle: diets.includes(keyword as Util.ElementType<typeof diets>)
            ? "Diet"
            : "Religion",
          direction: mapBounds!
        });
      } else {
        fetchRestaurantByCountryMutate({
          country: keyword,
          direction: mapBounds!
        });
      }
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
