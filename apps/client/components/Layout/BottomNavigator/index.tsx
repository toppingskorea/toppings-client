import { css, useTheme } from "@emotion/react";
import { flex, padding, width100 } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { useInternalRouter, useProtectRouteModal } from "~/hooks";
import navList from "./BottomNavigator.constants";
import {
  useClickNavigationHandler,
  useRenderIcon
} from "./BottomNavigator.hooks";

const BottomNavigator = () => {
  const { colors, dimensions, zIndex } = useTheme();
  const { asPath } = useInternalRouter();

  const { onClickProtectedButtonHandler } = useProtectRouteModal();

  const { renderIcon } = useRenderIcon();
  const { onClickNavigationHandler } = useClickNavigationHandler();

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
            <button
              type="button"
              onClick={() => {
                if (href === "/") onClickNavigationHandler(href);
                else
                  onClickProtectedButtonHandler(() =>
                    onClickNavigationHandler(href)
                  );
              }}
              css={css`
                path {
                  fill: ${colors.secondary[href === asPath ? "6D" : "D9"]};
                }
              `}
            >
              {renderIcon(icon, activatedIcon, href)}
            </button>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavigator;
