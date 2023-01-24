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
import { OpenGraph } from "~/components/Util";
import useClickHandler from "./Info.hooks";

export type Props = Pick<
  Restaurant.DetailDTO,
  | "id"
  | "name"
  | "address"
  | "description"
  | "type"
  | "scrap"
  | "like"
  | "likeCount"
  | "images"
>;

const Info = ({
  address,
  description,
  id,
  like,
  name,
  scrap,
  type,
  likeCount,
  images
}: Props) => {
  const { colors, weighs } = useTheme();

  const {
    onClipboardClickHandler,
    onLikeButtonClickHandler,
    onScrapButtonClickHandler,
    onShareButtonClickHandler
  } = useClickHandler({
    address,
    description,
    id,
    like,
    name,
    scrap
  });

  return (
    <Stack.Vertical
      css={css`
        ${size.width100}
      `}
    >
      <OpenGraph title={name} description={description} imageUrl={images[0]} />
      <Flex
        justify="space-between"
        css={css`
          ${size.width100}
        `}
      >
        <Flex direction="column">
          <Text _fontSize={24} _color={colors.primary} weight={weighs.semiBold}>
            {name}
          </Text>
          <Spacing size={8} />
          <Text
            _fontSize={15}
            _color={colors.secondary[47]}
            weight={weighs.semiBold}
          >
            {type}
          </Text>
          <Spacing size={3} />
          <Flex align="center">
            <Text _fontSize={14} _color={colors.secondary[47]}>
              {address}
            </Text>
            <Spacing direction="horizontal" size={8} />
            <MotionButton onClick={onClipboardClickHandler}>
              <Copy />
            </MotionButton>
          </Flex>
        </Flex>

        <Stack.Horizontal gutter={20} align="flex-start">
          <button type="button" onClick={onShareButtonClickHandler}>
            <Share />
          </button>
          <button type="button" onClick={onScrapButtonClickHandler}>
            {scrap ? <FilledScrap /> : <EmptyScrap />}
          </button>
          <Flex direction="column" align="center">
            <button type="button" onClick={onLikeButtonClickHandler}>
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
