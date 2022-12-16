import type { PropsWithChildren, Ref } from "react";
import { forwardRef } from "react";
import { css } from "@emotion/react";
import { hiddenScroll } from "~/styles/emotionUtils";

const SnapCarouselWrapper = forwardRef(function SnapCarouselWrapper(
  { children }: PropsWithChildren,
  forwardedRef: Ref<HTMLDivElement>
) {
  return (
    <section
      css={css`
        width: 100%;
        scroll-snap-type: x mandatory;
        display: flex;
        overflow-x: scroll;
        ${hiddenScroll}
      `}
      ref={forwardedRef}
    >
      {children}
    </section>
  );
});

const SnapCarouselItem = ({ children }: PropsWithChildren) => {
  return (
    <article
      css={css`
        scroll-snap-align: center;
        flex-shrink: 0;
        width: 100%;
      `}
    >
      {children}
    </article>
  );
};

const SnapCarousel = {
  Wrapper: SnapCarouselWrapper,
  Item: SnapCarouselItem
};

export default SnapCarousel;
