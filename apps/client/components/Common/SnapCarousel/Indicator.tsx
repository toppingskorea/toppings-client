import { css, useTheme } from "@emotion/react";
import { flex, gutter, size } from "@toss/emotion-utils";
import { useMemo } from "react";
import useIndicator from "./Indicator.hooks";

interface IndicatorProps {
  wrapperRef: HTMLDivElement | null;
}

const Indicator = ({ wrapperRef }: IndicatorProps) => {
  const { colors } = useTheme();
  const childrenLength = wrapperRef ? wrapperRef.childNodes.length : 0;
  const childrenIdArray = useMemo(
    () => Array.from(Array(childrenLength).keys()),
    [childrenLength]
  );

  const { currentIndex } = useIndicator({ wrapperRef });

  return (
    <div
      css={css`
        ${flex({ direction: "row", justify: "center" })}
        ${gutter({ direction: "horizontal", space: 8 })}
      `}
    >
      {childrenIdArray.map(eachIndex => (
        <span
          key={eachIndex}
          css={css`
            ${size({
              width: 6,
              height: 6
            })}
            border-radius: 50%;
            background-color: ${currentIndex === eachIndex
              ? colors.primary
              : colors.secondary.D9};
            transition: background-color 0.3s;
          `}
        />
      ))}
    </div>
  );
};

export default Indicator;
