import { useCurrentSelectKeywordValue } from "@atoms/index";
import { css, useTheme } from "@emotion/react";
import { Flex, gutter, height100, width100 } from "@toss/emotion-utils";
import Image from "next/image";
import HeartWithNumber from "../HeartWithNumber";
import { Text } from "../Typo";

interface Props {
  onClick: VoidFunction;
  item: Restaurant.CardDTO;
  whoLikes?: boolean;
}

const RestaurantCard = ({ onClick, item, whoLikes }: Props) => {
  const { colors, weighs } = useTheme();

  const currentSelectKeyword = useCurrentSelectKeywordValue();

  return (
    <Flex
      as="button"
      onClick={onClick}
      justify="space-between"
      css={css`
        ${width100}
        border-bottom: 1px solid ${colors.secondary.DF};
        padding-bottom: 10px;
      `}
    >
      <Flex
        css={css`
          gap: 13px;
        `}
      >
        <Image
          src={item.thumbnail}
          width={80}
          height={80}
          alt=""
          css={css`
            border-radius: 7px;
            object-fit: cover;
          `}
        />
        <Flex
          justify={whoLikes ? "flex-start" : "space-between"}
          direction="column"
          css={css`
            ${whoLikes && "gap: 4px;"}
          `}
        >
          <Flex
            direction="column"
            css={css`
              ${gutter("vertical", 6)}
            `}
          >
            <Text _fontSize={13} _color={colors.secondary[52]}>
              {item.type}
            </Text>

            <Text
              _fontSize={16}
              _color={colors.secondary["4B"]}
              weight={weighs.semiBold}
            >
              {item.name}&nbsp;
              <Text _fontSize={10} _color={colors.secondary["4B"]}>
                by {item.writer}
              </Text>
            </Text>
          </Flex>
          <Text _fontSize={10} _color={colors.secondary["46"]}>
            {item.address}
          </Text>
          {whoLikes && (
            <Flex
              direction="column"
              justify="flex-end"
              css={css`
                ${height100}
                align-self: flex-start;
              `}
            >
              <Text
                _fontSize={10}
                weight={weighs.semiBold}
                _color={colors.primary}
              >
                {`${currentSelectKeyword} likes ${item.filterLikeCount}`}
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>

      <HeartWithNumber like={item.like} likeCount={item.likeCount} />
    </Flex>
  );
};

export default RestaurantCard;
