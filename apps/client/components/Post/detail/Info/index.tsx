import { css, useTheme } from "@emotion/react";
import {
  Copy,
  EmptyHeart,
  EmptyScrap,
  FilledScrap,
  OrangeHeart,
  Share
} from "@svgs/common";
import { Flex, size, Spacing, Stack } from "@toss/emotion-utils";
import { MotionButton } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import {
  useDeleteLike,
  useDeleteScrap,
  usePostLike,
  usePostScrap
} from "~/server/restaurant";
import { clipboard } from "~/utils";

type Props = Pick<
  Restaurant.DetailDTO,
  | "id"
  | "name"
  | "address"
  | "description"
  | "type"
  | "scrap"
  | "like"
  | "likeCount"
>;

const Info = ({
  address,
  description,
  id,
  like,
  name,
  scrap,
  type,
  likeCount
}: Props) => {
  const { colors, weighs } = useTheme();

  const { mutate: postScrapMutate } = usePostScrap(id);
  const { mutate: deleteScrapMutate } = useDeleteScrap(id);
  const { mutate: postLikeMutate } = usePostLike(id);
  const { mutate: deleteLikeMutate } = useDeleteLike(id);

  return (
    <Stack.Vertical
      css={css`
        ${size.width100}
      `}
    >
      <Flex
        justify="space-between"
        css={css`
          ${size.width100}
        `}
      >
        <Stack.Vertical gutter={4}>
          <Text _fontSize={24} _color={colors.primary} weight={weighs.semiBold}>
            {name}
          </Text>
          <Text
            _fontSize={15}
            _color={colors.secondary[47]}
            weight={weighs.semiBold}
          >
            {type}
          </Text>
          <Flex align="center">
            <Text _fontSize={14} _color={colors.secondary[47]}>
              {address}
            </Text>
            <MotionButton onClick={() => clipboard(address)}>
              <Copy />
            </MotionButton>
          </Flex>
        </Stack.Vertical>

        <Stack.Horizontal gutter={20} align="flex-start">
          {/* TODO: device share 기능 배포후 확인 필요 */}
          <button
            type="button"
            onClick={() => {
              const shareData = {
                title: document.title,
                text: "Hello World",
                url: "https://developer.mozilla.org"
              };

              if (navigator.canShare && navigator.canShare(shareData))
                navigator.share(shareData);
            }}
          >
            <Share />
          </button>
          <button
            type="button"
            onClick={() => {
              if (scrap) deleteScrapMutate(id);
              else postScrapMutate(id);
            }}
          >
            {scrap ? <FilledScrap /> : <EmptyScrap />}
          </button>
          <Flex direction="column" align="center">
            <button
              type="button"
              onClick={() => {
                if (like) deleteLikeMutate(id);
                else postLikeMutate(id);
              }}
            >
              {like ? (
                <OrangeHeart width={20} height={17} />
              ) : (
                <EmptyHeart width={20} height={17} />
              )}
            </button>
            <Spacing size={6} />
            <Text _fontSize={10} _color={colors.secondary.A3}>
              {likeCount}
            </Text>
          </Flex>
        </Stack.Horizontal>
      </Flex>

      <Text _fontSize={12} _color={colors.secondary[69]}>
        {description}
      </Text>
    </Stack.Vertical>
  );
};

export default Info;
