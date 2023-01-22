/* eslint-disable jsx-a11y/click-events-have-key-events */
import { css, useTheme } from "@emotion/react";
import { CircleThreeDot } from "@svgs/common";
import { Flex, size, Spacing, touchable, width100 } from "@toss/emotion-utils";
import { useOverlay } from "@toss/use-overlay";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, type MouseEvent } from "react";
import {
  AlertModal,
  BottomSelectModal,
  CircleCountry,
  MotionButton
} from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { useReviewUploadSetter } from "~/recoil/atoms/review";
import { useDeleteReview } from "~/server/review";
import { ellipsisTextByLength } from "~/utils";

interface Props {
  review: Restaurant.ReviewDTO;
}

const ReviewItem = ({ review }: Props) => {
  const { query, push } = useRouter();
  const { colors, weighs } = useTheme();
  const reviewUploadSetter = useReviewUploadSetter();
  const { mutate: deleteReviewMutate } = useDeleteReview(Number(query.id));
  const overlay = useOverlay();

  const onThreeDotClickHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();

      overlay.open(({ exit }) => (
        <BottomSelectModal
          itemList={[
            {
              text: "modify",
              onClickHandler: () => {
                reviewUploadSetter({ id: review.id });
                push(`/review/add/${query.id}`);
              }
            },
            {
              text: "delete",
              onClickHandler: () =>
                overlay.open(({ exit, close }) => (
                  <AlertModal
                    exitFn={exit}
                    rightClickFn={() => {
                      deleteReviewMutate(review.id);
                      close();
                    }}
                    rightText="delete"
                  />
                ))
            }
          ]}
          exit={exit}
        />
      ));
    },
    [deleteReviewMutate, overlay, push, query.id, review.id, reviewUploadSetter]
  );

  return (
    <li
      key={review.id}
      onClick={() => {
        push(`/review/${review.id}`);
      }}
      css={css`
        ${touchable}
      `}
    >
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
                <CircleCountry country={review.country} size={12} padding={4} />

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
                <MotionButton onClick={onThreeDotClickHandler}>
                  <CircleThreeDot />
                </MotionButton>
              )}
            </Flex>
          </Flex>

          <Spacing size={4} />

          <Text
            _fontSize={10}
            lineHeight={12}
            _color={colors.secondary[34]}
            css={css`
              word-break: break-all;
            `}
          >
            {ellipsisTextByLength(review.description, 100)}
          </Text>
          <Spacing size={4} />
        </Flex>
      </Flex>
    </li>
  );
};

export default ReviewItem;
