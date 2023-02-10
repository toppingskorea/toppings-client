import { css, useTheme } from "@emotion/react";
import {
  Copy,
  EmptyHeart,
  EmptyScrap,
  FilledScrap,
  OrangeHeart,
  Share
} from "@svgs/common";
import {
  flex,
  Flex,
  padding,
  size,
  Spacing,
  Stack,
  touchable
} from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Text } from "~/components/Common/Typo";
import { OpenGraph } from "~/components/Util";
import { useFetchRestaurant } from "~/server/restaurant";
import useClickHandler from "./Info.hooks";

const Info = () => {
  const { colors, weighs } = useTheme();

  const { query } = useRouter();

  const {
    data: {
      address,
      description,
      id,
      like,
      name,
      scrap,
      type,
      likeCount,
      images,
      instagramId
    }
  } = useFetchRestaurant(Number(query.id));

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
          ${padding({ x: 12 })}
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
            <Spacing direction="horizontal" size={3} />
            <motion.button
              whileTap={{ scale: 0.9 }}
              css={css`
                ${touchable}
                ${flex({
                  justify: "center"
                })}
              `}
              onClick={onClipboardClickHandler}
            >
              <Copy />
            </motion.button>
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

      <article
        css={css`
          ${padding({
            x: 15,
            y: 9
          })}
          border-radius: 10px;
          background-color: ${colors.secondary.F2};
        `}
      >
        <Text
          _fontSize={15}
          _color={colors.secondary[69]}
          weight={weighs.medium}
          css={css`
            word-wrap: break-word;
            user-select: text;
          `}
        >
          {description}

          {instagramId && (
            <a
              href={`https://www.instagram.com/${instagramId}`}
              target="_blank"
              rel="noreferrer"
              css={css`
                color: ${colors.secondary[44]};
                ${touchable}
              `}
            >
              &nbsp;by @{instagramId}
            </a>
          )}
        </Text>
      </article>
    </Stack.Vertical>
  );
};

export default Info;
