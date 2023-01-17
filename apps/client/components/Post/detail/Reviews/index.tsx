import { css } from "@emotion/react";
import { padding, Stack } from "@toss/emotion-utils";
import { useFetchReviews } from "~/server/review";
import ReviewItem from "./ReviewItem";

interface Props {
  id: string;
}
const Reviews = ({ id }: Props) => {
  const { data: reviews } = useFetchReviews(+id);

  return (
    <Stack.Vertical
      as="ul"
      css={css`
        ${padding({ x: 17 })}
      `}
    >
      {reviews.items.map(review => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </Stack.Vertical>
  );
};

export default Reviews;
