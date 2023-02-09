import { css, type Theme } from "@emotion/react";
import { hexToRgba } from "@toppings/utils";
import { position } from "@toss/emotion-utils";

const commonLayoutCss = (theme: Theme) => css`
  ${position("fixed", { top: 0, right: 0, bottom: 0, left: 0 })}
  z-index: ${theme.zIndex.four};
  background-color: ${hexToRgba(theme.colors.black, 0.3)};
`;

export default commonLayoutCss;
