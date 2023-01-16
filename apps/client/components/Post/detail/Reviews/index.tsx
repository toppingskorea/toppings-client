import { useReviewUploadSetter } from "@atoms/review";
import { css, useTheme } from "@emotion/react";
import { CircleThreeDot } from "@svgs/common";
import {
  Flex,
  padding,
  size,
  Spacing,
  Stack,
  width100
} from "@toss/emotion-utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { CircleCountry, MotionButton } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { useFetchReviews } from "~/server/review";

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
        ${padding({ x: 17 })}
      `}
    >
      {reviews.map(review => (
        <li key={review.id}>
          <Flex>
            <Image
              src={review.thumbnail}
              alt=""
              width={81}
              height={81}
              css={css`
                border-radius: 8px;
                min-width: 81px;
              `}
            />

            <Spacing direction="horizontal" size={10} />
            <Flex
              direction="column"
              css={css`
                ${width100}
              `}
            >
              <Flex
                justify="space-between"
                align="center"
                css={css`
                  ${width100}
                `}
              >
                <Flex
                  align="center"
                  justify="space-between"
                  css={css`
                    ${width100}
                  `}
                >
                  <Flex align="center">
                    <CircleCountry
                      country={review.country}
                      size={12}
                      padding={4}
                    />

                    <Spacing direction="horizontal" size={7} />

                    <Text _fontSize={13} weight={weighs.semiBold}>
                      {review.name}
                    </Text>

                    <Spacing direction="horizontal" size={2} />

                    <div
                      css={css`
                        ${size({
                          width: 2,
                          height: 2
                        })}
                        background-color: ${colors.black};
                        border-radius: 50%;
                      `}
                    />

                    <Spacing direction="horizontal" size={2} />

                    <Text _fontSize={13} weight={weighs.semiBold}>
                      {review.habits[0]}
                    </Text>

                    <Spacing direction="horizontal" size={16} />

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

              <Spacing size={4} />

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
