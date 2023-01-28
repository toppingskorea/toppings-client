import { dehydrate, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { GetServerSideProps } from "next";
import { ReviewAddPage } from "~/components/Review";
import { env } from "~/constants";
import { Keys } from "~/server/restaurant";

export const getServerSideProps: GetServerSideProps<{
  restaurantId: string;
}> = async context => {
  const restaurantId = context.query.restaurantId as string;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(Keys.restaurant(+restaurantId), async () => {
    const { data } = await axios.get<{ data: Restaurant.DetailDTO }>(
      `${env.TOPPINGS_SERVER_URL}/api/v1/restaurant/${restaurantId}`,
      {
        headers: {
          Authorization: `Bearer ${context.req.cookies[env.TOPPINGS_TOKEN_KEY]}`
        }
      }
    );

    return data.data;
  });

  return {
    props: {
      restaurantId,
      dehydratedState: dehydrate(queryClient)
    }
  };
};

export default ReviewAddPage;
