import { css } from "@emotion/react";

/**
 * @description 스크롤을 보이지 않게 합니다.
 *
 * ```ts
 * const hiddenScroll: SerializedStyles;
 * ```
 */
const hiddenScroll = css`
  ::-webkit-scrollbar {
    display: none;
    width: 0;
    background-color: transparent;
  }
`;

export default hiddenScroll;
