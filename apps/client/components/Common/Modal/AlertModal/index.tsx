import { css, useTheme } from "@emotion/react";
import { Flex, gutter, Spacing } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import {
  defaultScaleChangeVariants,
  defaultSlideFadeInVariants,
  framerMocker
} from "~/constants";
import { Text } from "../../Typo";
import commonLayoutCss from "../Modal.constants";
import * as Styled from "./AlertModal.styles";

interface Props {
  exitFn: VoidFunction;
  rightClick?: {
    fn: VoidFunction;
    text: string;
  };
  information?: string;
}

const Clickable = ({
  exitFn,
  rightClick
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
      <Styled.EllipseFlex>
        <motion.button
          {...framerMocker}
          variants={defaultScaleChangeVariants}
          type="button"
          onClick={exitFn}
        >
          <Text _fontSize={18} weight={weighs.bold} _color={colors.primary}>
            cancel
          </Text>
        </motion.button>

        <Spacing direction="horizontal" size={46} />

        <Styled.VerticalLine />

        <Spacing direction="horizontal" size={46} />
        <motion.button
          {...framerMocker}
          variants={defaultScaleChangeVariants}
          type="button"
          onClick={() => {
            rightClick.fn();
            exitFn();
          }}
        >
          <Text _fontSize={18} weight={weighs.bold} _color={colors.primary}>
            {rightClick.text}
          </Text>
        </motion.button>
      </Styled.EllipseFlex>
    </Flex.Center>
  );
};

const NonClickable = ({ information }: Pick<Props, "information">) => {
  const { colors, weighs } = useTheme();

  return (
    <motion.div
      {...framerMocker}
      variants={defaultSlideFadeInVariants("bottom")}
    >
      <Styled.EllipseFlex>
        <Text
          _fontSize={18}
          weight={weighs.medium}
          _color={colors.primary}
          textAlign="center"
          whiteSpace="pre-wrap"
        >
          {information}
        </Text>
      </Styled.EllipseFlex>
    </motion.div>
  );
};

const AlertModal = ({ exitFn, rightClick, information }: Props) => {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <Flex.Center
      direction="column"
      css={css`
        ${commonLayoutCss(theme)}
        ${gutter({ direction: "vertical", space: 30 })}
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

      {rightClick ? (
        <Clickable rightClick={rightClick} exitFn={exitFn} />
      ) : (
        <NonClickable information={information} />
      )}
    </Flex.Center>
  );
};

export default AlertModal;
