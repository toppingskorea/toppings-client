import { css } from "@emotion/react";
import { Flex, width100 } from "@toss/emotion-utils";
import type { PropsWithChildren, Ref } from "react";
import { forwardRef } from "react";
import { hiddenScroll } from "~/styles";

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
    <Flex
      as="article"
      justify="center"
      css={css`
        scroll-snap-align: center;
        flex-shrink: 0;
        ${width100}
      `}
    >
      {children}
    </Flex>
  );
};

const SnapCarousel = {
  Wrapper: SnapCarouselWrapper,
  Item: SnapCarouselItem
};

export default SnapCarousel;
