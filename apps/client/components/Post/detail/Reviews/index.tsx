import { useReviewUploadSetter } from "@atoms/review";
import { css, useTheme } from "@emotion/react";
import { avatar } from "@images/profile";
import { CircleThreeDot } from "@svgs/common";
import { Flex, padding, Spacing, Stack, width100 } from "@toss/emotion-utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { MotionButton } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { useFetchReviews } from "~/server/review";
import { countryToSvg } from "~/utils";

interface Props {
  id: string;
}
const Reviews = ({ id }: Props) => {
  const { push } = useRouter();
  const { colors, weighs } = useTheme();
  const { data: reviews } = useFetchReviews(+id);
  const reviewUploadSetter = useReviewUploadSetter();

  return (
    <Stack.Vertical
      as="ul"
      css={css`
        ${padding({ x: 24 })}
      `}
    >
      {reviews.map(review => (
        <li key={review.id}>
          <Flex>
            <Image
              src={
                review.thumbnail.includes("data") ? review.thumbnail : avatar
              }
              alt=""
              width={64}
              height={64}
              css={css`
                border-radius: 8px;
              `}
            />

            <Spacing direction="horizontal" size={10} />
            <Flex
              direction="column"
              css={css`
                ${width100}
              `}
            >
              <Flex justify="space-between" align="center">
                <Flex
                  align="center"
                  justify="space-between"
                  css={css`
                    ${width100}
                  `}
                >
                  <Flex align="center">
                    <Image
                      src={countryToSvg(review.country)}
                      alt=""
                      width={16}
                      height={24}
                      css={css`
                        border-radius: 8px;
                      `}
                    />
                    <Spacing direction="horizontal" size={4} />
                    <Text _fontSize={13} weight={weighs.semiBold}>
                      {review.name}
                    </Text>

                    <Spacing direction="horizontal" size={6} />

                    <Text _fontSize={10} _color={colors.secondary.B8}>
                      {review.modifiedAt}
                    </Text>
                  </Flex>
                  {review.isMine && (
                    <MotionButton
                      onClick={() => {
                        reviewUploadSetter({ id: review.id });
                        push(`/review/add/${id}`);
                      }}
                    >
                      <CircleThreeDot />
                    </MotionButton>
                  )}
                </Flex>
              </Flex>

              <Text _fontSize={10} _color={colors.secondary[34]}>
                {review.description}
              </Text>
              <Spacing size={4} />
            </Flex>
          </Flex>
        </li>
      ))}
    </Stack.Vertical>
  );
};

export default Reviews;
