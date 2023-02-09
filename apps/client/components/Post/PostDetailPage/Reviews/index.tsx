import { css } from "@emotion/react";
import { lastItem } from "@toppings/utils";
import { padding, Stack } from "@toss/emotion-utils";
import Skeleton from "~/components/Skeleton";
import { InfiniteScrollSensor } from "~/components/Util";
import { useFetchReviews } from "~/server/review";
import ReviewItem from "./ReviewItem";

interface Props {
  id: string;
}
const Reviews = ({ id }: Props) => {
  const { data: reviews, fetchNextPage: reviewsFetchNextPage } =
    useFetchReviews(+id);

  return (
    <Stack.Vertical
      as="ul"
      css={css`
        ${padding({ x: 17 })}
      `}
    >
      {reviews.pages.map(page =>
        page.items.map(review => <ReviewItem key={review.id} review={review} />)
      )}

      {lastItem(reviews.pages)?.page !== lastItem(reviews.pages)?.totalPage &&
        lastItem(reviews.pages)?.items.length !== 0 && (
          <InfiniteScrollSensor
            onIntersected={() => {
              reviewsFetchNextPage();
            }}
            render={ref => (
              <Skeleton.Box
                ref={ref}
                size={{
                  width: "100%",
                  height: 80
                }}
              />
            )}
          />
        )}
    </Stack.Vertical>
  );
};

export default Reviews;
