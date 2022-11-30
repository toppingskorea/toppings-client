import { css, useTheme } from "@emotion/react";
import { GrayPlus, Minus } from "@svgs/common";
import {
  Flex,
  flex,
  gutter,
  padding,
  position,
  size,
  touchable
} from "@toss/emotion-utils";
import Image from "next/image";
import { Text } from "../Typo";

interface Props {
  images: string[];
}

const Gallery = ({ images }: Props) => {
  const theme = useTheme();
  return (
    <ul
      css={css`
        ${flex({ direction: "row" })}
        ${gutter({ direction: "horizontal", space: 6 })}
        ${padding({ top: 8 })}
        overflow-x: scroll;
        ::-webkit-scrollbar {
          display: none;
        }
      `}
    >
      {images.map((image, index) => (
        <li
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          css={css`
            position: relative;
            display: inline-block;
          `}
        >
          <Minus
            css={css`
              ${position("absolute", {
                top: 0,
                right: 0
              })}
              transform: translate3d(50%,-50%,0);
              ${touchable}
            `}
          />
          <Image
            src={image}
            alt=""
            width={100}
            height={100}
            css={css`
              border-radius: 10px;
            `}
          />
        </li>
      ))}
      <li
        css={css`
          position: relative;
          display: inline-block;
          border: 1px dashed ${theme.colors.secondary.B8};
          border-radius: 10px;
        `}
      >
        <Flex.Center
          as="button"
          css={css`
            ${size({
              width: 100,
              height: 100
            })};

            ${touchable}
          `}
        >
          <GrayPlus />
        </Flex.Center>

        <Text
          _fontSize={10}
          _color={theme.colors.secondary[79]}
          css={css`
            ${position("absolute", { bottom: 10, left: "50%" })}
            transform: translate3d(-50%,0,0);
          `}
        >
          3 / 5
        </Text>
      </li>
    </ul>
  );
};

export default Gallery;
