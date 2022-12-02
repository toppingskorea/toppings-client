import { css, useTheme } from "@emotion/react";
import type { ComponentProps } from "react";
import type { emotionTheme } from "~/styles";
import { Button } from ".";

interface Props extends ComponentProps<typeof Button> {
  bgcolor?:
    | Util.ValueOf<typeof emotionTheme.colors>
    | Util.ValueOf<typeof emotionTheme.colors.secondary>;
}

const FilledButton = ({ children, bgcolor, ...rest }: Props) => {
  const { colors } = useTheme();

  return (
    <Button
      css={css`
        background-color: ${bgcolor || colors.white};
      `}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default FilledButton;
