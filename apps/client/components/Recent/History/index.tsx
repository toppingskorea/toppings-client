import { css } from "@emotion/react";
import { RemoveHistory, Timeline } from "@svgs/recent";
import { useQueryClient } from "@tanstack/react-query";
import { Flex, flex, gutter, padding, touchable } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { diets } from "~/constants/data/common";
import {
  useCurrentSelectCategorySetter,
  useMapBoundsValue,
  useMapSearchByCountrySetter
} from "~/recoil/atoms";
import {
  Keys,
  useDeleteRecentHistory,
  useFetchEatingHabitByFiltering,
  useFetchRecentHistory
} from "~/server/recent";

const History = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
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

  const historyClickHandler = (
    category: Recent.HistoryDTO["category"],
    keyword: Recent.HistoryDTO["keyword"],
    restaurantId: Recent.HistoryDTO["restaurantId"]
  ) => {
    if (category === "Name") push(`/post/${restaurantId}`);
    if (category === "Habit") {
      setCurrentSelectCategory(keyword);
      fetchEatingHabitByFilteringMutate({
        habit: keyword,
        habitTitle: diets.includes(keyword as Util.ElementType<typeof diets>)
          ? "Diet"
          : "Religion",
        direction: mapBounds!
      });
      push("/map");
    }
  };

  return (
    <div
      css={css`
        ${flex({ direction: "column" })}
        ${gutter("vertical", 23)}
        ${padding({
          x: 27
        })}
      `}
    >
      {recentHistories.map(({ id, keyword, category, restaurantId }) => (
        <Flex key={id} justify="space-between" align="center">
          <Flex.Center
            onClick={() => {
              historyClickHandler(category, keyword, restaurantId);
            }}
            css={css`
              gap: 12px;
            `}
          >
            <Timeline />
            {keyword}
          </Flex.Center>

          <RemoveHistory
            onClick={() => deleteRecentHistoryMutate(id)}
            css={css`
              ${touchable}
            `}
          />
        </Flex>
      ))}
    </div>
  );
};

export default History;
