import { css, useTheme } from "@emotion/react";
import { Flex, gutter, position, size } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { defaultScaleChangeVariants, framerMocker } from "~/constants";
import { hexToRgba } from "~/utils";
import { Text } from "../../Typo";

interface Props {
  exitFn: VoidFunction;
  deleteFn?: VoidFunction;
  information?: string;
}

const Clickable = ({
  exitFn,
  deleteFn
}: Required<Omit<Props, "information">>) => {
  const { colors, weighs } = useTheme();

  return (
    <Flex.Center
      direction="column"
      css={css`
        ${gutter("vertical", 16)}
      `}
    >
      <Text _fontSize={23} weight={weighs.heavy} _color={colors.white}>
        Are you sure?
      </Text>
      <Flex.Center
        css={css`
          ${gutter("horizontal", 122)}
          background-color: ${hexToRgba(colors.secondary.E2, 0.9)};
          padding: 15px 74px;
          border-radius: 49.5px;
        `}
      >
        <motion.button
          {...framerMocker}
          variants={defaultScaleChangeVariants}
          type="button"
          onClick={exitFn}
        >
          <Text _fontSize={18} weight={weighs.bold} _color={colors.primary}>
            cancle
          </Text>
        </motion.button>
        <motion.button
          {...framerMocker}
          variants={defaultScaleChangeVariants}
          type="button"
          onClick={deleteFn}
        >
          <Text _fontSize={18} weight={weighs.bold} _color={colors.primary}>
            delete
          </Text>
        </motion.button>
      </Flex.Center>
    </Flex.Center>
  );
};

const NonClickable = ({ information }: Pick<Props, "information">) => {
  const { colors, weighs } = useTheme();

  return (
    <Flex.Center
      css={css`
        ${gutter("horizontal", 122)}
        background-color: ${hexToRgba(colors.secondary.E2, 0.9)};
        padding: 15px 74px;
        border-radius: 49.5px;
      `}
    >
      <Text _fontSize={18} weight={weighs.bold} _color={colors.primary}>
        {information}
      </Text>
    </Flex.Center>
  );
};

const AlertModal = ({ exitFn, deleteFn, information }: Props) => {
  const { colors, zIndex } = useTheme();

  return (
    <Flex.Center
      direction="column"
      css={css`
        ${position("fixed", { top: 0, right: 0, bottom: 0, left: 0 })}
        ${size.full}
        ${gutter({ direction: "vertical", space: 30 })}
        background-color: ${hexToRgba(colors.black, 0.3)};
        z-index: ${zIndex.ten};
      `}
      onClick={() => {
        if (information) exitFn();
      }}
    >
      <Flex.Center
        css={css`
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: ${colors.secondary.E2};
          opacity: 0.9;
        `}
      >
        <Text _fontSize={32} _color={colors.primary}>
          !
        </Text>
      </Flex.Center>

      {deleteFn ? (
        <Clickable deleteFn={deleteFn} exitFn={exitFn} />
      ) : (
        <NonClickable information={information} />
      )}
    </Flex.Center>
  );
};

export default AlertModal;
