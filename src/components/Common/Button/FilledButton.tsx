import { css, useTheme } from "@emotion/react";
import type { ComponentProps } from "react";
import { Button } from ".";

interface Props extends ComponentProps<typeof Button> {
  // TODO: 타입 강화하기
  bgColor?: string;
}

const FilledButton = (props: Props) => {
  const theme = useTheme();
  const { children, bgColor, ...rest } = props;

  return (
    <Button
      css={css`
        background-color: ${bgColor || theme.colors.white};
      `}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default FilledButton;
