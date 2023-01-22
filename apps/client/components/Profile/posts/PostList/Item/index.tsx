import { css, useTheme } from "@emotion/react";
import {
  Flex,
  flex,
  gutter,
  padding,
  Stack,
  touchable,
  width100
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
        ${flex({ align: "flex-end" })}
        ${gutter({ direction: "horizontal", space: 18 })}
        ${padding({ top: 14, bottom: 14, x: 4 })}
        ${touchable}
        border-bottom: 1px solid ${colors.secondary.D9};
      `}
      onClick={() => push(`/post/${post.id}`)}
    >
      <Image
        src={post.thumbnail}
        alt={post.description}
        width={164}
        height={164}
        css={css`
          min-width: 164px;
          border-radius: 20px;
          box-shadow: 0 4px 4px ${hexToRgba(colors.black, 0.25)};
        `}
      />

      <Flex
        direction="column"
        justify="space-between"
        align="flex-end"
        css={css`
          ${width100}
          height: 164px;
        `}
      >
        <Text _fontSize={11} _color={colors.secondary["83"]}>
          {post.type}
        </Text>

        <Stack.Vertical
          gutter={4}
          css={css`
            ${width100}
          `}
        >
          <Text
            _fontSize={15}
            weight={weighs.semiBold}
            _color={colors.secondary[34]}
            css={css`
              max-width: 128px;
            `}
          >
            {post.name}
          </Text>

          <Stack.Horizontal justify="space-between">
            <Text _fontSize={11} _color={colors.secondary["83"]}>
              {post.address}
            </Text>
            <HeartWithNumber like={post.like} likeCount={post.likeCount} />
          </Stack.Horizontal>
        </Stack.Vertical>
      </Flex>
    </li>
  );
};

export default Item;
