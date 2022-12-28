import { css, useTheme } from "@emotion/react";
import { Flex, gutter, width100 } from "@toss/emotion-utils";
import Image from "next/image";
import HeartWithNumber from "../HeartWithNumber";
import { Text } from "../Typo";

interface Props {
  onClick: VoidFunction;
  item: Restaurant.CardDTO;
}

const RestaurantCard = ({ onClick, item }: Props) => {
  const { colors, weighs } = useTheme();

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
            border: 1px solid black;
            border-radius: 7px;
          `}
        />

        <Flex justify="space-between" direction="column">
          <Flex
            direction="column"
            css={css`
              ${gutter("vertical", 6)}
            `}
          >
            <Text _fontSize={13} _color={colors.secondary[52]}>
              {item.type}
            </Text>

            <Flex
              align="center"
              css={css`
                gap: 6px;
              `}
            >
              <Text
                _fontSize={16}
                _color={colors.secondary["4B"]}
                weight={weighs.semiBold}
              >
                {item.name}
              </Text>
              <Text _fontSize={10} _color={colors.secondary["4B"]}>
                by {item.writer}
              </Text>
            </Flex>
          </Flex>
          <Text _fontSize={10} _color={colors.secondary["46"]}>
            {item.address}
          </Text>
        </Flex>
      </Flex>

      <Flex
        align="flex-end"
        css={css`
          gap: 6px;
        `}
      >
        <HeartWithNumber like={item.like} likeCount={item.likeCount} />
      </Flex>
    </Flex>
  );
};

export default RestaurantCard;
