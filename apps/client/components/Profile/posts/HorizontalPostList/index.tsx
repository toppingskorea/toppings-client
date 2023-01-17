import type { UseSuspenseQueryResultOnSuccess } from "@suspensive/react-query";
import { Stack } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { RestaurantCard } from "~/components/Common";

interface Props {
  query: () => UseSuspenseQueryResultOnSuccess<
    Common.PaginationResponse<Restaurant.BaseDTO>
  >;
}

const HorizontalPostList = ({ query }: Props) => {
  const { push } = useRouter();
  const { data: restaurants } = query();

  return (
    <Stack.Vertical gutter={10}>
      {restaurants.items.map(restaurant => (
        <RestaurantCard
          key={restaurant.id}
          onClick={() => push(`/post/${restaurant.id}`)}
          item={restaurant}
        />
      ))}
    </Stack.Vertical>
  );
};

export default HorizontalPostList;
