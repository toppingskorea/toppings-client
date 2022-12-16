import { throttle } from "lodash";
import { useEffect, useMemo, useState } from "react";

interface Props {
  wrapperRef: HTMLDivElement | null;
}

const useIndicator = ({ wrapperRef }: Props) => {
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
};

export default useIndicator;
