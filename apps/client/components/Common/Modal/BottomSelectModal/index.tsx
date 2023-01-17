import { css, useTheme } from "@emotion/react";
import { position, Spacing } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { Fragment } from "react";
import { framerMocker, staggerOne } from "~/constants";
import { hexToRgba } from "~/utils";
import Button from "./Button";

export interface Item {
  text: string;
  onClickHandler: VoidFunction;
}

interface Props {
  itemList: Item[];
  exit: VoidFunction;
}

const BottomSelectModal = ({ itemList, exit: close }: Props) => {
  const { colors, zIndex } = useTheme();

  return (
    <div
      css={css`
        ${position("fixed", { top: 0, right: 0, bottom: 0, left: 0 })}
        z-index: ${zIndex.four};
        background-color: ${hexToRgba(colors.black, 0.3)};
      `}
    >
      <motion.ul
        variants={staggerOne}
        {...framerMocker}
        css={css`
          ${position("fixed", { left: 0, right: 0, bottom: 46 })}
        `}
      >
        {itemList.map(item => (
          <Fragment key={item.text}>
            <Button text={item.text} onClickHandler={item.onClickHandler} />
            <Spacing size={2} />
          </Fragment>
        ))}

        <Spacing size={9} />
        <Button text="close" onClickHandler={close} />
      </motion.ul>
    </div>
  );
};

export default BottomSelectModal;
