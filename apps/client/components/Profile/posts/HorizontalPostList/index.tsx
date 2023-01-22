import type { UseSuspenseInfiniteQueryResultOnSuccess } from "@suspensive/react-query";
import { Stack } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { RestaurantCard } from "~/components/Common";
import Skeleton from "~/components/Skeleton";
import { InfiniteScrollSensor } from "~/components/Util";
import { lastItem } from "~/utils/common/lastItem";

interface Props {
  query: () => UseSuspenseInfiniteQueryResultOnSuccess<
    Common.PaginationResponse<Restaurant.BaseDTO>
  >;
}

const HorizontalPostList = ({ query }: Props) => {
  const { push } = useRouter();
  const { data: restaurants, fetchNextPage: restaurantsFetchNextPage } =
    query();

  return (
    <Stack.Vertical gutter={10}>
      {restaurants.pages.map(restaurant =>
        restaurant.items.map(restaurant => (
          <RestaurantCard
            key={restaurant.id}
            onClick={() => push(`/post/${restaurant.id}`)}
            item={restaurant}
          />
        ))
      )}

      {lastItem(restaurants.pages)?.page !==
        lastItem(restaurants.pages)?.totalPage && (
        <InfiniteScrollSensor
          onIntersected={() => {
            restaurantsFetchNextPage();
          }}
          render={ref => (
            <Skeleton.Box
              ref={ref}
              size={{
                width: "100%",
                height: 150
              }}
            />
          )}
        />
      )}
    </Stack.Vertical>
  );
};

export default HorizontalPostList;
