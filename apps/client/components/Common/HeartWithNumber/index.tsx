import { css } from "@emotion/react";
import { EmptyHeart, OrangeHeart } from "@svgs/common";
import { Flex, gutter, margin } from "@toss/emotion-utils";
import { Text } from "../Typo";

interface Props {
  like: boolean;
  likeCount: number;
}

const HeartWithNumber = ({ like, likeCount }: Props) => {
  return (
    <Flex
      align="flex-end"
      css={css`
        ${gutter("horizontal", 4)}
        ${margin({
          right: 11
        })}
      `}
    >
      {like ? (
        <OrangeHeart width={13} height={12} />
      ) : (
        <EmptyHeart width={13} height={12} />
      )}

      <Text _fontSize={12}>{likeCount}</Text>
    </Flex>
  );
};

export default HeartWithNumber;
