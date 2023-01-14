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
  useFetchRecentHistories,
  useFetchRestaurantByCountry
} from "~/server/recent";

const useHistory = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const setCurrentSelectKeyword = useCurrentSelectKeywordSetter();
  const setCurrentSelectCategory = useCurrentSelectCategorySetter();
  const { data: recentHistories } = useFetchRecentHistories();
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
    switch (category) {
      case "Name":
        push(`/post/${restaurantId}`);
        break;
      case "Habit":
        setCurrentSelectKeyword(keyword);
        fetchEatingHabitByFilteringMutate({
          habit: keyword,
          habitTitle: diets.includes(keyword as Util.ElementType<typeof diets>)
            ? "Diet"
            : "Religion",
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
