import { css } from "@emotion/react";
import { position, touchable } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { Minus } from "~/assets/svgs/common";
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
      width={100}
      height={100}
      css={css`
        border-radius: 10px;
      `}
    />
  </motion.li>
);

export default Item;
