import { css, useTheme } from "@emotion/react";
import { Flex, padding } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { MotionButton } from "~/components/Common";
import { Text } from "~/components/Common/Typo";

const ReviewLeadingSection = () => {
  const { weighs, colors } = useTheme();
  const { push, query } = useRouter();

  return (
    <Flex.Center>
      <MotionButton
        onClick={() => push(`/review/add/${query.id}`)}
        css={css`
          ${padding({ x: 21, y: 4 })}
          background-color: ${colors.secondary.D9};
          border-radius: 100px;
        `}
      >
        <Text _fontSize={12} weight={weighs.bold} _color={colors.secondary[69]}>
          Write a Review
        </Text>
      </MotionButton>
    </Flex.Center>
  );
};

export default ReviewLeadingSection;
