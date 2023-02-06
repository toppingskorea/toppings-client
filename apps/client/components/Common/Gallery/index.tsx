import { css, useTheme } from "@emotion/react";
import { GrayPlus } from "@svgs/common";
import {
  Flex,
  flex,
  gutter,
  padding,
  position,
  size,
  touchable
} from "@toss/emotion-utils";
import { useId } from "react";
import { hiddenScroll } from "~/styles/emotionUtils";
import { imageUploader } from "~/utils";
import { Text } from "../Typo";
import { useHideInput } from "./Gallery.hooks";
import Item from "./Item";

export interface Props {
  images: string[];
  setImages: (images: string[]) => void;
  totalNumber?: number;
}

const Gallery = ({ images, setImages, totalNumber = 5 }: Props) => {
  const id = useId();
  const { colors } = useTheme();

  const { hideInput } = useHideInput({ images, totalNumber });

  return (
    <ul
      css={css`
        ${flex({ direction: "row" })}
        ${gutter({ direction: "horizontal", space: 6 })}
          ${padding({ top: 8 })}
          overflow-x: scroll;
        ${hiddenScroll}
      `}
    >
      {images.map(image => (
        <Item
          key={image.slice(0, 1000)}
          image={image}
          onClick={() => setImages(images.filter(item => item !== image))}
        />
      ))}
      {!hideInput && (
        <li
          css={css`
            position: relative;
            display: inline-block;
            border: 1px dashed ${colors.secondary.B8};
            border-radius: 10px;
          `}
        >
          <label htmlFor={id}>
            <Flex.Center
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
              _color={colors.secondary[79]}
              css={css`
                ${position("absolute", { bottom: 10, left: "50%" })}
                transform: translate3d(-50%,0,0);
              `}
            >
              {images.length} / {totalNumber}
            </Text>
          </label>
          <input
            id={id}
            type="file"
            accept="image/*"
            multiple
            onChange={async e => {
              const base64 = await imageUploader(e, true);
              if (base64) setImages([...images, base64]);
            }}
            css={css`
              display: none;
            `}
          />
        </li>
      )}
    </ul>
  );
};

export default Gallery;
