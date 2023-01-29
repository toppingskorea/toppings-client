import { css, useTheme } from "@emotion/react";
import { grayLogo } from "@images/common";
import { Flex, height100, position } from "@toss/emotion-utils";
import Image from "next/image";
import { Text } from "~/components/Common/Typo";
import { OpenGraph } from "~/components/Util";
import { useSetNavigation } from "~/hooks";

const ErrorPage = () => {
  const { colors, weighs, dimensions } = useTheme();
  useSetNavigation({
    bottom: true
  });

  return (
    <>
      <OpenGraph title="Error" />
      <Flex.Center
        css={css`
          ${height100}
        `}
      >
        <Image src={grayLogo} alt="TOPPINGS" width={250} height={102} />
        <Text
          _fontSize={17}
          _color={colors.secondary[69]}
          weight={weighs.bold}
          css={css`
            ${position("fixed", {
              bottom: dimensions.bottomNavigationHeight + 104
            })}
          `}
        >
          Page not found.
        </Text>
      </Flex.Center>
    </>
  );
};

export default ErrorPage;
