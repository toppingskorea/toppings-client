import { css, useTheme } from "@emotion/react";
import { padding, position, width100 } from "@toss/emotion-utils";

interface Props {
  children: JSX.Element;
}

const SearchLayout = ({ children }: Props) => {
  const { colors, dimensions } = useTheme();

  return (
    <div
      css={css`
        ${padding({ x: 16, y: 22 })};
        ${position("fixed", { bottom: 0 })}
        background-color: ${colors.white};
        max-width: ${dimensions.viewWidth - 32}px;
        ${width100}
      `}
    >
      {children}
    </div>
  );
};

export default SearchLayout;
