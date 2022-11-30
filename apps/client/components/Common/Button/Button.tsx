import { css } from "@emotion/react";
import { size, touchable } from "@toss/emotion-utils";
import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: Parameters<typeof size>[0];
}

const Button = ({ children, size: _size, ...rest }: Props) => {
  return (
    <button
      type="button"
      css={css`
        ${size(_size)}
        border-radius: 100px;
        ${touchable}
      `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
