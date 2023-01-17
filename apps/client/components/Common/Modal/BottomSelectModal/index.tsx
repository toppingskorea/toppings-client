import { css, useTheme } from "@emotion/react";
import { position, Spacing } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { Fragment } from "react";
import { framerMocker, staggerOne } from "~/constants";
import commonLayoutCss from "../Modal.constants";
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
  const theme = useTheme();

  return (
    <div css={commonLayoutCss(theme)}>
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
