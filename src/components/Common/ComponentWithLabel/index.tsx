import { useTheme } from "@emotion/react";
import { Stack } from "@toss/emotion-utils";
import type { PropsWithChildren } from "react";
import { Text } from "../Typo";

interface Props {
  label: string;
  gutter?: number;
}

const ComponentWithLabel = ({
  label,
  children,
  gutter
}: PropsWithChildren<Props>) => {
  const theme = useTheme();
  return (
    <Stack.Vertical gutter={gutter}>
      <Text
        _fontSize={16}
        weight={theme.weighs.bold}
        _color={theme.colors.secondary[62]}
      >
        {label}
      </Text>
      {children}
    </Stack.Vertical>
  );
};

export default ComponentWithLabel;
