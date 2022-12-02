import { css, useTheme } from "@emotion/react";
import {
  Flex,
  flex,
  gutter,
  padding,
  size,
  Spacing,
  Stack,
  touchable
} from "@toss/emotion-utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { HeartWithNumber } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { hexToRgba } from "~/utils";

interface Props {
  post: Profile.PostDTO;
}

const Item = ({ post }: Props) => {
  const { colors, weighs } = useTheme();
  const { push } = useRouter();

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <li
      key={post.id}
      css={css`
        ${flex({ direction: "column", align: "center" })}
        ${gutter({ direction: "vertical", space: 24 })}
        ${padding({ top: 16, bottom: 8, x: 4 })}
        ${touchable}
        border-bottom: 1px solid ${colors.secondary.D9};
      `}
      onClick={() => push(`/post/${post.id}`)}
    >
      <Image
        src={post.thumbnail}
        alt={post.description}
        width={344}
        height={174}
        css={css`
          border-radius: 20px;
          box-shadow: 0 4px 4px ${hexToRgba(colors.black, 0.25)};
        `}
      />

      <Stack.Vertical
        css={css`
          ${size({
            width: 344
          })}
        `}
        gutter={4}
      >
        <Flex justify="space-between">
          <Flex align="flex-end">
            <Text _fontSize={16} weight={weighs.semiBold}>
              {post.name}
            </Text>
            <Spacing size={6} direction="horizontal" />
            <Text _fontSize={12} _color={colors.secondary["49"]}>
              {post.type}
            </Text>
          </Flex>
          <HeartWithNumber like={post.like} likeCount={post.likeCount} />
        </Flex>
        <Flex justify="space-between">
          <Text _fontSize={10} _color={colors.secondary[34]}>
            {post.address}
          </Text>
          <Text _fontSize={10} _color={colors.secondary[34]}>
            by {post.writer}
          </Text>
        </Flex>
      </Stack.Vertical>
    </li>
  );
};

export default Item;
