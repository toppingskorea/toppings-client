import { css } from "@emotion/react";
import { Spacing, width100 } from "@toss/emotion-utils";
import { useState } from "react";
import { Indicator, SnapCarousel } from "~/components/Common";

interface Props {
  images: string[];
}

const ImageCarousel = ({ images }: Props) => {
  const [carouselWrapperRef, setCarouselWrapperRef] =
    useState<HTMLDivElement | null>(null);
  return (
    <>
      <SnapCarousel.Wrapper ref={setCarouselWrapperRef}>
        {images.map((image, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SnapCarousel.Item key={index}>
            <img
              src={image}
              alt=""
              css={css`
                border-radius: 25px;
                ${width100}
                max-width: 364px;
                aspect-ratio: 1;
              `}
            />
          </SnapCarousel.Item>
        ))}
      </SnapCarousel.Wrapper>
      <Spacing size={20} />
      <Indicator wrapperRef={carouselWrapperRef} />
    </>
  );
};

export default ImageCarousel;
