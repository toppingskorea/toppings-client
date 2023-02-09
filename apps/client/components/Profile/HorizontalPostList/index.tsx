import type { UseSuspenseInfiniteQueryResultOnSuccess } from "@suspensive/react-query";
import { lastItem } from "@toppings/utils";
import { Stack } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { RestaurantCard } from "~/components/Common";
import { EmptyView } from "~/components/Layout";
import Skeleton from "~/components/Skeleton";
import { InfiniteScrollSensor } from "~/components/Util";

interface Props {
  query: () => UseSuspenseInfiniteQueryResultOnSuccess<
    Common.PaginationResponse<Restaurant.BaseDTO>
  >;
}

const HorizontalPostList = ({ query }: Props) => {
  const { push, pathname } = useRouter();

  const { data: restaurants, fetchNextPage: restaurantsFetchNextPage } =
    query();

  if (restaurants.pages[0].items.length === 0) {
    // savedPage가 아니라면 review 페이지입니다.
    const isSavedPage = lastItem(pathname.split("/")) === "saved";

    return (
      <EmptyView content={isSavedPage ? "No saved posts" : "No reviews"} />
    );
  }

  return (
    <Stack.Vertical gutter={10}>
      {restaurants.pages.map(page =>
        page.items.map(restaurant => (
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
