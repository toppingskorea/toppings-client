import { css, useTheme } from "@emotion/react";
import { Text } from "~/components/Common/Typo";

const EmptyText = () => {
  const { colors, weighs } = useTheme();

  return (
    <Text
      _fontSize={13}
      lineHeight={16}
      _color={colors.secondary.A3}
      weight={weighs.bold}
      whiteSpace="pre"
      textAlign="center"
      css={css`
        display: block;
      `}
    >
      Click the first like!
    </Text>
  );
};

export default EmptyText;
