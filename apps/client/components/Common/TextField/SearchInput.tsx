import { css, useTheme } from "@emotion/react";
import { CircleExit, Search } from "@svgs/common";
import { position, width100 } from "@toss/emotion-utils";
import type { ComponentProps } from "react";
import { Input } from ".";

interface Props extends ComponentProps<typeof Input> {
  onSubmit?: VoidFunction;
  setValue: (value: string) => void;
}

const SearchInput = (props: Props) => {
  const { onSubmit, setValue, value, ...rest } = props;
  const { colors, weighs } = useTheme();

  return (
    <div
      css={css`
        ${width100}
      `}
    >
      <Input
        onKeyDown={e => {
          if (e.key === "Enter" && onSubmit) onSubmit();
        }}
        preAppend={
          <button type="button" onClick={onSubmit}>
            <Search />
          </button>
        }
        absoluteNode={
          <button
            type="button"
            onClick={() => setValue("")}
            css={css`
              ${position("absolute", { top: "50%", right: 10 })}
              display: flex;
              transform: translate3d(0, -50%, 0);
            `}
          >
            <CircleExit />
          </button>
        }
        value={value}
        {...rest}
        css={css`
          border-radius: 100px;
          background-color: ${colors.secondary.D9};
          border: none;
          font-size: 17px;
          font-weight: ${weighs.medium};
          &::placeholder {
            color: ${colors.white};
          }
        `}
      />
    </div>
  );
};

export default SearchInput;
