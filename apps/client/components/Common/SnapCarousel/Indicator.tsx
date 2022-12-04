import { css, useTheme } from "@emotion/react";
import { flex, gutter, size } from "@toss/emotion-utils";
import throttle from "lodash/throttle";
import { useEffect, useMemo, useState } from "react";

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

interface UseIndicatorProps {
  wrapperRef: HTMLDivElement | null;
}

function useIndicator({ wrapperRef }: UseIndicatorProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const throttledOnScroll = useMemo(
    () =>
      throttle(() => {
        if (!wrapperRef) return;
        const { offsetWidth, scrollLeft } = wrapperRef;
        const tempIndex = Math.round(scrollLeft / offsetWidth);
        setCurrentIndex(tempIndex);
      }, 300),
    [wrapperRef]
  );

  useEffect(() => {
    if (!wrapperRef) return;
    wrapperRef.addEventListener("scroll", throttledOnScroll);

    // eslint-disable-next-line consistent-return
    return () => {
      wrapperRef.removeEventListener("scroll", throttledOnScroll);
    };
  }, [throttledOnScroll, wrapperRef]);

  return { currentIndex };
}
