import { dehydrate, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { GetServerSideProps } from "next";
import { ReviewDetailPage } from "~/components/Review";
import { env } from "~/constants";
import { Keys } from "~/server/review";

export const getServerSideProps: GetServerSideProps<{
  id: string;
}> = async context => {
  const id = context.query.id as string;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(Keys.review(+id), async () => {
    const { data } = await axios.get<{ data: Restaurant.ReviewDTO }>(
      `${env.TOPPINGS_SERVER_URL}/api/v1/review/${id}`,
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
      id,
      dehydratedState: dehydrate(queryClient)
    }
  };
};

export default ReviewDetailPage;
