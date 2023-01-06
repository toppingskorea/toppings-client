import { css, useTheme } from "@emotion/react";
import { List } from "@svgs/map";
import { flex, position } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Text } from "~/components/Common/Typo";
import { defaultScaleChangeVariants, framerMocker } from "~/constants";

interface Props {
  isViewList?: true;
}

const ViewStatusButton = ({ isViewList }: Props) => {
  const { colors, zIndex, weighs } = useTheme();
  const { back, push } = useRouter();

  return (
    <motion.button
      type="button"
      {...framerMocker}
      whileHover="whileHover"
      variants={defaultScaleChangeVariants}
      onClick={() => {
        if (isViewList) back();
        else push("/map/viewList");
      }}
      css={css`
        ${position("absolute", {
          bottom: 16
        })}
        left: 40%;
        ${flex("center")}
        padding: 8px 21px;
        border-radius: 20px;
        background-color: ${colors.white};
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        z-index: ${zIndex.two};
      `}
    >
      <List />
      <Text
        _fontSize={15}
        weight={weighs.medium}
        css={css`
          margin-left: 19px;
        `}
      >
        {isViewList ? "View map" : "View lists"}
      </Text>
    </motion.button>
  );
};

export default ViewStatusButton;
