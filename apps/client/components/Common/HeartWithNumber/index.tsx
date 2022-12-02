import { OrangeHeart, EmptyHeart } from "@svgs/common";
import { Flex, Spacing } from "@toss/emotion-utils";
import { Text } from "../Typo";

interface Props {
  likeCount: number;
  like: boolean;
}

const HeartWithNumber = ({ like, likeCount }: Props) => {
  return (
    <Flex>
      {like ? <OrangeHeart /> : <EmptyHeart />}
      <Spacing size={4} direction="horizontal" />
      <Text _fontSize={12}>{likeCount}</Text>
    </Flex>
  );
};

export default HeartWithNumber;
