/* eslint-disable react/jsx-no-useless-fragment */
import type { SerializedStyles } from "@emotion/react";
import { css, jsx, useTheme } from "@emotion/react";
import { Flex, width100, padding as _padding } from "@toss/emotion-utils";
import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes
} from "react";
import { useEffect, useRef } from "react";

type InputAndTextarea = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface Props extends InputAndTextarea {
  /**
   * 사용 할 HTML 요소입니다.
   *
   * @default 'input'
   */
  as?: "input" | "textarea";

  /**
   * input value 입니다.
   */

  value?: string;

  /**
   * input 앞에 붙을 요소입니다. 보통 아이콘 삽입을 위해 사용합니다.
   *
   * preAppend가 존재하면 input에 `margin-left: 14px` 이 주어집니다.
   */
  preAppend?: ReactNode;

  /**
   * input 요소가 고정적인 높이를 가지고 있어야 할 때 사용합니다. (단위: px)
   */
  height?: number;

  /**
   * padding 요소가 변경되어야 할 때 사용합니다. (SerializedStyles)
   *
   * @default 18
   */
  padding?: SerializedStyles;

  /**
   * input 자동 포커스 boolean 값을 넣어 사용합니다.
   */
  autoFocus?: boolean;

  /**
   * input이 blur가 될 때 실행할 액션입니다.
   */
  onBlur?: VoidFunction;
  /**
   * 절대위치로 설정하고 싶은 노드입니다.
   */
  absoluteNode?: ReactNode;
}

const Input = ({
  as = "input",
  preAppend,
  padding = _padding({ x: 18 }),
  autoFocus = false,
  height,
  absoluteNode,
  ...rest
}: Props) => {
  const { colors } = useTheme();
  const inputRef = useRef<HTMLInputElement | null>(null);
  // input auto focus하면서 커서 맨 뒤로 보내기
  useEffect(() => {
    if (!autoFocus) return;
    const valueLength = inputRef.current?.value.length ?? 0;
    inputRef.current?.focus();
    inputRef.current?.setSelectionRange(valueLength, valueLength);
  }, [autoFocus]);

  return (
    <Flex
      css={css`
        position: relative;
        ${width100}
      `}
    >
      <>
        {preAppend && <div>{preAppend}</div>}
        {jsx(
          as,
          {
            // textarea 일 경우에 156 설정, fixedHeight 가 정해져 있다면 우선
            css: css`
              ${width100}
              ${padding}
              height:${height ? `${height}px` : "unset"};
              margin-left: ${preAppend ? "14px" : "auto"};
              border: 1px solid ${colors.secondary.B8};
              border-radius: 10px;
              font-family: inherit;

              &:disabled {
                background-color: ${colors.white};
                border: 1px solid ${colors.secondary.B8};
              }
            `,
            ref: inputRef,
            ...rest
          },
          null
        )}
        {absoluteNode && <>{absoluteNode}</>}
      </>
    </Flex>
  );
};
export default Input;
