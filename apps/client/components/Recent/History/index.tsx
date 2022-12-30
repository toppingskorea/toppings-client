import { css } from "@emotion/react";
import { RemoveHistory, Timeline } from "@svgs/recent";
import { useQueryClient } from "@tanstack/react-query";
import { Flex, flex, gutter, padding, touchable } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { useMapBoundsValue, useMapSearchByCountrySetter } from "~/recoil/atoms";
import {
  Keys,
  useDeleteRecentHistory,
  useFetchDefaultMap,
  useFetchRecentHistory
} from "~/server/recent";

const History = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const { data } = useFetchRecentHistory();
  const { mutate } = useDeleteRecentHistory({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: Keys.recent()
      });
    }
  });

  const setMapSearchByCountry = useMapSearchByCountrySetter();
  const mapBounds = useMapBoundsValue();
  const { mutate: defaultMap } = useFetchDefaultMap({
    onSuccess: data => {
      setMapSearchByCountry(data);
    }
  });

  const clickHandler = (
    category: Recent.HistoryDTO["category"],
    restaurantId: Recent.HistoryDTO["restaurantId"]
  ) => {
    if (category === "Name") push(`/post/${restaurantId}`);
    if (category === "Habit") {
      defaultMap(mapBounds!);
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
      {data.map(({ id, keyword, category, restaurantId }) => (
        <Flex key={id} justify="space-between" align="center">
          <Flex.Center
            onClick={() => clickHandler(category, restaurantId)}
            css={css`
              gap: 12px;
            `}
          >
            <Timeline />
            {keyword}
          </Flex.Center>

          <RemoveHistory
            onClick={() => mutate(id)}
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
