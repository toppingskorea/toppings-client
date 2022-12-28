import { Stack } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { RestaurantCard } from "~/components/Common";
import type { SuspendedUseQueryResultOnSuccess } from "~/hooks";

interface Props {
  query: () => SuspendedUseQueryResultOnSuccess<Restaurant.BaseDTO[]>;
}

const HorizontalPostList = ({ query }: Props) => {
  const { push } = useRouter();
  const { data: restaurants } = query();

  return (
    <Stack.Vertical gutter={10}>
      {restaurants.map(restaurant => (
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
