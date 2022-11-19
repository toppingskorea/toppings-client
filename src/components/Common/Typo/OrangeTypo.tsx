import { useTheme } from "@emotion/react";
import type { ComponentProps } from "react";
import { Text } from "~/components/Common/Typo";

const OrangeTypo = (
  props: Omit<
    ComponentProps<typeof Text>,
    "_fontSize" | "weight" | "lineHeight" | "_color"
  >
) => {
  const theme = useTheme();
  return (
    <Text
      weight={theme.weighs.bold}
      _fontSize={23}
      lineHeight={28}
      _color={theme.colors.primary}
      {...props}
    />
  );
};

export default OrangeTypo;
