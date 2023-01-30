import { css, useTheme } from "@emotion/react";
import { padding, position } from "@toss/emotion-utils";
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
        width: 560px;
        ${position("fixed", {
          bottom: isBlur ? dimensions.bottomNavigationHeight - 20 : 0
        })}
        ${padding({
          y: 20,
          left: 27
        })}
        backdrop-filter: blur(10px);
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
                x: 21,
                y: 11
              }}
              _fontSize={17}
              defaultProps={{
                bgcolor: pathname.includes(id) ? colors.primary : colors.white,
                bordercolor: colors.secondary.D9,
                _color: pathname.includes(id) ? colors.white : colors.black
              }}
              onClick={() => push(`/recent/filter/${id}`)}
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
