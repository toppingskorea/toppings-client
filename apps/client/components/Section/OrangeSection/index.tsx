import { css, useTheme } from "@emotion/react";
import { logo } from "@images/common";
import { Flex, flex, gutter, position, size } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  description: JSX.Element;
  button: JSX.Element;
}

const OrangeSection = ({ description, button }: Props) => {
  const { colors } = useTheme();
  return (
    <section
      css={css`
        background-color: ${colors.primary};
        ${position("fixed", 0, 0, 0, 0)}
        ${flex({ direction: "column", align: "center" })}
        ${size.full}
      `}
    >
      <div
        css={css`
          ${position("absolute", {
            top: "50%"
          })}
          transform: translateY(-75%); // 326 / 434 비율로 맞췄습니다.
        `}
      >
        <Image src={logo} alt="TOPPINGS" />
      </div>

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
  );
};

export default OrangeSection;
