import { css, useTheme } from "@emotion/react";
import { flex, gutter } from "@toss/emotion-utils";
import { Star } from "~/assets/svgs/common";
import { FilledButton } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { OrangeSection } from "~/components/Section";
import { useInternalRouter } from "~/hooks";

const DuplicatedOverlay = () => {
  const theme = useTheme();
  const router = useInternalRouter();
  return (
    <OrangeSection
      description={
        <Text
          _fontSize={16}
          _color={theme.colors.white}
          whiteSpace="pre"
          textAlign="center"
        >
          There toppings is{"\n"}already registered 🤔
        </Text>
      }
      button={
        <FilledButton
          size={{
            width: 231,
            height: 38
          }}
          // TODO:이 식당의 리뷰있는곳으로 가기
          onClick={() => {
            router.push("/map");
          }}
          css={css`
            ${flex({
              direction: "row",
              align: "center",
              justify: "center"
            })}

            ${gutter({ direction: "horizontal", space: 16 })}
          `}
        >
          <Star />
          <Text
            _fontSize={15}
            _color={theme.colors.secondary[49]}
            weight={theme.weighs.medium}
          >
            Go to write a review
          </Text>
        </FilledButton>
      }
    />
  );
};

export default DuplicatedOverlay;
