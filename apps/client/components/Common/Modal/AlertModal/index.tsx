import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, gutter } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import {
  defaultScaleChangeVariants,
  defaultSlideFadeInVariants,
  framerMocker
} from "~/constants";
import { hexToRgba } from "~/utils";
import { Text } from "../../Typo";
import commonLayoutCss from "../Modal.constants";

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
      <EllipseFlex>
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
        <motion.button
          {...framerMocker}
          variants={defaultScaleChangeVariants}
          type="button"
          onClick={() => {
            deleteFn();
            exitFn();
          }}
        >
          <Text _fontSize={18} weight={weighs.bold} _color={colors.primary}>
            delete
          </Text>
        </motion.button>
      </EllipseFlex>
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
      <EllipseFlex>
        <Text _fontSize={18} weight={weighs.bold} _color={colors.primary}>
          {information}
        </Text>
      </EllipseFlex>
    </motion.div>
  );
};

const AlertModal = ({ exitFn, deleteFn, information }: Props) => {
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

      {deleteFn ? (
        <Clickable deleteFn={deleteFn} exitFn={exitFn} />
      ) : (
        <NonClickable information={information} />
      )}
    </Flex.Center>
  );
};

export default AlertModal;

const EllipseFlex = styled(Flex.Center)`
  ${gutter("horizontal", 122)}
  background-color: ${({ theme }) => hexToRgba(theme.colors.secondary.E2, 0.9)};
  padding: 15px 74px;
  border-radius: 49.5px;
`;
