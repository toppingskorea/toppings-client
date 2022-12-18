import { css } from "@emotion/react";
import { Spacing } from "@toss/emotion-utils";
import Image from "next/image";
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
            <Image
              src={image}
              alt=""
              width={364}
              height={364}
              css={css`
                border-radius: 25px;
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
