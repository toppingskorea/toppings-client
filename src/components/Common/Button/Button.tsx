import { css } from "@emotion/react";
import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  width: number;
  height: number;
}

const Button = (props: Props) => {
  const { children, width, height, ...rest } = props;

  return (
    <button
      type="button"
      css={css`
        width: ${width}px;
        height: ${height}px;
        border-radius: 100px;
      `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
