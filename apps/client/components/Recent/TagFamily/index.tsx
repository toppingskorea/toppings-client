import { css, useTheme } from "@emotion/react";
import { position } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { RoundedTag } from "~/components/Common";
import { hiddenScroll } from "~/styles/emotionUtils";
import tagList from "./TagFamily.constants";

interface Props {
  isBlur?: true;
}

const TagFamily = ({ isBlur }: Props) => {
  const { colors, dimensions } = useTheme();
  const { pathname, push } = useRouter();

  return (
    <div
      css={css`
        ${position("fixed", {
          bottom: dimensions.bottomNavigationHeight - 20
        })}
        padding-left: 27px;
        ${isBlur && "backdrop-filter: blur(10px);"}
      `}
    >
      <div
        css={css`
          width: 90vw;
          overflow-x: scroll;
          ${hiddenScroll}
        `}
      >
        <ul
          css={css`
            display: flex;
            gap: 4px;
            white-space: nowrap;
          `}
        >
          {tagList.map(({ id, name }) => (
            <RoundedTag
              key={id}
              isTouchable
              padding={{
                x: 16,
                y: 7
              }}
              _fontSize={17}
              defaultProps={{
                bgcolor: pathname.includes(id) ? colors.primary : colors.white,
                bordercolor: colors.secondary.D9,
                _color: pathname.includes(id) ? colors.white : colors.black
              }}
              onClick={() => push(`/recent/${id}`)}
            >
              {name}
            </RoundedTag>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TagFamily;
