import { useTheme } from "@emotion/react";
import type { ComponentProps } from "react";
import { Text } from "~/components/Common/Typo";

const OrangeTypo = (
  props: Omit<
    ComponentProps<typeof Text>,
    "_fontSize" | "weight" | "lineHeight" | "_color"
  >
) => {
  const { colors, weighs } = useTheme();

  return (
    <Text
      weight={weighs.bold}
      _fontSize={23}
      lineHeight={28}
      _color={colors.primary}
      {...props}
    />
  );
};

export default OrangeTypo;
