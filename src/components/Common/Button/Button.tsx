import { css } from "@emotion/react";
import { size, touchable } from "@toss/emotion-utils";
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
        ${size({ width, height })}
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
