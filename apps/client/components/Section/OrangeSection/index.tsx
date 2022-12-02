import { css, useTheme } from "@emotion/react";
import { logo } from "@images/common";
import {
  Flex,
  flex,
  gutter,
  position,
  SafeArea,
  size,
  Spacing
} from "@toss/emotion-utils";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  description: JSX.Element;
  button: JSX.Element;
}

const OrangeSection = ({ description, button }: Props) => {
  const { colors } = useTheme();
  return (
    <SafeArea>
      <section
        css={css`
          ${position("fixed", 0, 0, 0, 0)}
          ${flex({ direction: "column", align: "center" })}
          ${size.full}
          background-color: ${colors.primary};
        `}
      >
        <Spacing size={170} />

        <Image src={logo} alt="TOPPINGS" />

        <Flex
          direction="column"
          align="center"
          css={css`
            ${position("fixed", { bottom: 105 })}
            ${gutter({ space: 35, direction: "vertical" })}
          `}
        >
          {description}
          <motion.div whileTap={{ scale: 0.9 }}>{button}</motion.div>
        </Flex>
      </section>
    </SafeArea>
  );
};

export default OrangeSection;
