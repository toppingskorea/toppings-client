import { css, useTheme } from "@emotion/react";
import { Flex, padding } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { MotionButton } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { useProtectRouteModal } from "~/hooks";

const ReviewLeadingSection = () => {
  const { weighs, colors } = useTheme();
  const { push, query } = useRouter();
  const { onClickProtectedButtonHandler } = useProtectRouteModal();

  return (
    <Flex.Center>
      <MotionButton
        onClick={() =>
          onClickProtectedButtonHandler(() => push(`/review/add/${query.id}`))
        }
        css={css`
          ${padding({ x: 21, y: 4 })}
          background-color: ${colors.secondary.E6};
          border-radius: 100px;
        `}
      >
        <Text
          _fontSize={13}
          weight={weighs.medium}
          _color={colors.secondary[69]}
        >
          Write a Review
        </Text>
      </MotionButton>
    </Flex.Center>
  );
};

export default ReviewLeadingSection;
