import { css, useTheme } from "@emotion/react";
import { flex, gutter, touchable } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { Text } from "~/components/Common/Typo";
import { defaultSlideFadeInVariants } from "~/constants";
import { useInternalRouter } from "~/hooks";
import Ellipse from "../Ellipse";

interface Props extends ComponentProps<typeof Ellipse> {
  label: string;
  route: Route.Path;
}

const LabelWithEllipse = ({ label, children, route }: Props) => {
  const { colors } = useTheme();
  const { push } = useInternalRouter();

  return (
    <motion.li
      css={css`
        ${gutter({ direction: "vertical", space: 9 })}
        ${flex({ direction: "column", align: "center" })}
        ${touchable}
      `}
      variants={defaultSlideFadeInVariants("bottom")}
      onClick={() => push(route)}
    >
      <Text _fontSize={13} _color={colors.secondary[49]}>
        {label}
      </Text>
      <Ellipse>{children}</Ellipse>
    </motion.li>
  );
};

export default LabelWithEllipse;
