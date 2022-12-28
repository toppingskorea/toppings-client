import { usePostUploadReset, useRestaurantReset } from "@atoms/index";
import { css, useTheme } from "@emotion/react";
import { flex, padding, width100 } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { InternalLink } from "~/components/Common";
import { useInternalRouter } from "~/hooks";
import navList from "./BottomNavigator.constants";

const BottomNavigator = () => {
  const { colors, dimensions } = useTheme();
  const { asPath } = useInternalRouter();
  const restaurantReset = useRestaurantReset();
  const postUploadReset = usePostUploadReset();

  return (
    <nav
      css={css`
        ${width100}
        background-color: ${colors.white};
        max-width: inherit;
        height: ${dimensions.bottomNavigationHeight}px;
        ${padding({ x: 45, top: 20 })}
      `}
    >
      <ul
        css={css`
          ${flex({ justify: "space-between", align: "center" })};
        `}
      >
        {navList.map(({ icon, href }) => (
          <motion.li key={href} whileTap={{ scale: 0.9 }}>
            <InternalLink
              href={href}
              css={css`
                path {
                  fill: ${colors.secondary[href === asPath ? "6D" : "D9"]};
                }
              `}
              onClick={() => {
                if (href === "/post/add") {
                  restaurantReset();
                  postUploadReset();
                }
              }}
            >
              {icon}
            </InternalLink>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavigator;
