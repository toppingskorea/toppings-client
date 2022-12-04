import { css, useTheme } from "@emotion/react";
import { Flex, size, Stack } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import {
  Copy,
  EmptyHeart,
  EmptyScrap,
  FilledScrap,
  OrangeHeart,
  Share
} from "~/assets/svgs/common";
import { Text } from "~/components/Common/Typo";
import { clipboard } from "~/utils";

type Props = Pick<
  Restaurant.DetailDTO,
  "id" | "name" | "address" | "description" | "type" | "scrap" | "like"
>;

const Info = ({ address, description, id, like, name, scrap, type }: Props) => {
  const { colors, weighs } = useTheme();
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
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => clipboard(address)}
            >
              <Copy />
            </motion.button>
          </Flex>
        </Stack.Vertical>

        <Stack.Horizontal gutter={20}>
          <Share />
          {scrap ? <FilledScrap /> : <EmptyScrap />}
          <Flex direction="column">
            {like ? (
              <OrangeHeart width={20} height={17} />
            ) : (
              <EmptyHeart width={20} height={17} />
            )}
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
