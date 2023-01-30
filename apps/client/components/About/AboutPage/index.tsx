import { css, useTheme } from "@emotion/react";
import { gutter, padding, touchable } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { Text } from "~/components/Common/Typo";
import {
  defaultSlideFadeInVariants,
  framerMocker,
  staggerOne
} from "~/constants";
import { useSetNavigation } from "~/hooks";
import EXTERNAL_LINK_LIST from "./AboutPage.constants";

const AboutPage = () => {
  const { colors, weighs } = useTheme();

  useSetNavigation({
    top: {
      title: (
        <Text _fontSize={19} _color={colors.secondary[47]} weight={weighs.bold}>
          About
        </Text>
      )
    }
  });

  return (
    <section
      css={css`
        ${padding({ x: 27 })}
      `}
    >
      <motion.ul
        variants={staggerOne}
        {...framerMocker}
        css={css`
          ${gutter("vertical", 12)}
        `}
      >
        {EXTERNAL_LINK_LIST.map(item => (
          <motion.li
            key={item.label}
            variants={defaultSlideFadeInVariants("right")}
            css={css`
              ${touchable}
            `}
          >
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              css={css`
                font-size: 17px;
                font-weight: ${weighs.semiBold};
                color: ${colors.secondary[62]};
              `}
            >
              {item.label}
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
};

export default AboutPage;
