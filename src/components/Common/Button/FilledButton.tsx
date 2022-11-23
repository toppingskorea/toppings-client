import { css, useTheme } from "@emotion/react";
import type { ComponentProps } from "react";
import type { emotionTheme } from "~/styles";
import { Button } from ".";

interface Props extends ComponentProps<typeof Button> {
  bgColor?: Util.ValueOf<typeof emotionTheme.colors>;
}

const FilledButton = ({ children, bgColor, ...rest }: Props) => {
  const theme = useTheme();

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
