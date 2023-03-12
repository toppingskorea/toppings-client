/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useReviewUploadSetter } from "@atoms/review";
import { css, useTheme } from "@emotion/react";
import { CircleThreeDot } from "@svgs/common";
import { OrangeRightArrow } from "@svgs/post";
import {
  Flex,
  position,
  size,
  Spacing,
  touchable,
  width100
} from "@toss/emotion-utils";
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
import { useProtectRouteModal } from "~/hooks";
import { useDeleteReview } from "~/server/review";
import { ellipsisTextByLength } from "~/utils";

interface Props {
  review: Restaurant.ReviewDTO;
}

const ReviewItem = ({ review }: Props) => {
  const { query, push } = useRouter();
  const { colors, weighs } = useTheme();
  const { onClickProtectedButtonHandler } = useProtectRouteModal();
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
                    rightClick={{
                      fn: () => {
                        deleteReviewMutate(review.id);
                        close();
                      },
                      text: "delete"
                    }}
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
      onClick={() =>
        onClickProtectedButtonHandler(() => {
          push(`/review/${review.id}`);
        })
      }
      css={css`
        ${touchable}
      `}
    >
      <Flex>
        <Image
          src={review.thumbnail}
          alt=""
          width={87}
          height={87}
          css={css`
            border-radius: 8px;
            min-width: 87px;
          `}
        />

        <Spacing direction="horizontal" size={10} />
        <Flex
          direction="column"
          css={css`
            position: relative;
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

                <Spacing direction="horizontal" size={6} />

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

          <Spacing size={6} />

          <Text
            _fontSize={10}
            lineHeight={12}
            _color={colors.secondary[34]}
            css={css`
              width: calc(100% - 18px);
              word-break: break-all;
            `}
          >
            {ellipsisTextByLength(review.description, 100)}
          </Text>

          <OrangeRightArrow
            css={css`
              ${position("absolute", {
                top: "50%",
                right: 0
              })}
              transform: translate(0, -50%);
            `}
          />

          <Spacing size={4} />
        </Flex>
      </Flex>
    </li>
  );
};

export default ReviewItem;
