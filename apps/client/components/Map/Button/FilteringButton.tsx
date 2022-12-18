import { css, useTheme } from "@emotion/react";

import { Filtering } from "@svgs/map";
import { Exit } from "@svgs/recent";
import {
  flex,
  Flex,
  gutter,
  padding,
  position,
  touchable
} from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Text } from "~/components/Common/Typo";
import { defaultScaleChangeVariants, framerMocker } from "~/constants";
import { useRegisterReset, useRegisterValue } from "~/recoil/atoms";

const FilteringButton = () => {
  const { colors, zIndexs } = useTheme();
  const { push } = useRouter();
  const register = useRegisterValue();
  const resetRegister = useRegisterReset();

  return (
    <Flex.Center
      direction="row"
      css={css`
        ${position("absolute", {
          top: 52,
          right: 17
        })}

        ${gutter("horizontal", 8)}
        z-index: 10;
      `}
    >
      {register.country && (
        <div
          css={css`
            ${padding({
              x: 12,
              y: 7
            })}
            ${gutter("horizontal", 17)}
            ${touchable}
            border-radius: 20px;
            background-color: ${colors.dim.orange};
          `}
        >
          <Text _fontSize={17} _color={colors.white}>
            {register.country}
          </Text>
          <Exit onClick={() => resetRegister()} />
        </div>
      )}

      <motion.button
        type="button"
        onClick={() => push("/recent")}
        {...framerMocker}
        variants={defaultScaleChangeVariants}
        css={css`
          ${flex("center")}
          padding: 8px;
          border-radius: 8px;
          background-color: ${colors.primary};
          z-index: ${zIndexs.ten};
        `}
      >
        <Filtering />
      </motion.button>
    </Flex.Center>
  );
};

export default FilteringButton;
