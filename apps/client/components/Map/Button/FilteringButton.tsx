import { css, useTheme } from "@emotion/react";

import { Filtering } from "@svgs/map";
import { Exit } from "@svgs/recent";
import {
  Flex,
  gutter,
  padding,
  position,
  touchable
} from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Text } from "~/components/Common/Typo";
import { defaultScaleChangeVariants } from "~/constants";
import { useRegisterReset, useRegisterValue } from "~/recoil/atoms";

const FilteringButton = () => {
  const { colors } = useTheme();
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
      {/* TODO: 분리하자 리코일 도메인별로 */}
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
          <Exit />
        </div>
      )}

      <motion.button
        type="button"
        onClick={() => push("/recent")}
        initial="initial"
        animate="animate"
        whileHover="whileHover"
        variants={defaultScaleChangeVariants}
        css={css`
          padding: 8px;
          border-radius: 8px;
          background-color: ${colors.primary};
          z-index: 10;
        `}
      >
        <Filtering />
      </motion.button>
    </Flex.Center>
  );
};

export default FilteringButton;
