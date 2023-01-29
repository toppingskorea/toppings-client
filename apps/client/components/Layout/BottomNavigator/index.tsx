import { usePostUploadReset, useRestaurantReset } from "@atoms/index";
import { useNoticeActivateValue } from "@atoms/noticeActivate";
import { css, useTheme } from "@emotion/react";
import type { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import { flex, padding, width100 } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { InternalLink } from "~/components/Common";
import { useInternalRouter } from "~/hooks";
import navList from "./BottomNavigator.constants";

const BottomNavigator = () => {
  const { colors, dimensions, zIndex } = useTheme();
  const { asPath } = useInternalRouter();
  const noticeActivate = useNoticeActivateValue();
  const restaurantReset = useRestaurantReset();
  const postUploadReset = usePostUploadReset();

  const renderIcon = (
    icon: EmotionJSX.Element,
    activatedIcon: ReactNode,
    href: string
  ) => {
    if (href !== "/notice") return icon;

    if (noticeActivate) return activatedIcon;
    return icon;
  };

  return (
    <nav
      css={css`
        ${width100}
        background-color: ${colors.white};
        max-width: inherit;
        height: ${dimensions.bottomNavigationHeight}px;
        ${padding({ x: 45, top: 20 })}
        z-index: ${zIndex.two};
      `}
    >
      <ul
        css={css`
          ${flex({ justify: "space-between", align: "center" })};
        `}
      >
        {navList.map(({ icon, href, activatedIcon }) => (
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
              {renderIcon(icon, activatedIcon, href)}
            </InternalLink>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavigator;
