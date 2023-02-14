import { css } from "@emotion/react";
import { Minus } from "@svgs/common";
import { position, touchable } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { defaultScaleChangeVariants } from "~/constants";

interface Props {
  image: string;
  onClick: VoidFunction;
}

const Item = ({ image, onClick }: Props) => (
  <motion.li
    {...defaultScaleChangeVariants}
    css={css`
      position: relative;
      display: inline-block;
    `}
  >
    <button type="button" onClick={onClick}>
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
    </button>
    <Image
      src={image}
      alt=""
      width={150}
      height={150}
      css={css`
        aspect-ratio: 1;
        border-radius: 10px;
        object-fit: cover;
      `}
    />
  </motion.li>
);

export default Item;
