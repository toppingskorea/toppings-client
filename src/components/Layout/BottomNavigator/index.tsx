import { css, useTheme } from "@emotion/react";
import { flex, padding, position, width100 } from "@toss/emotion-utils";
import { InternalLink } from "~/components/Common";
import { useInternalRouter } from "~/hooks";
import navList from "./BottomNavigator.constants";

const BottomNavigator = () => {
  const theme = useTheme();
  const { asPath } = useInternalRouter();
  return (
    <nav
      css={css`
        ${position("fixed", { bottom: 0 })};
        ${width100}
        max-width: inherit;
        height: ${theme.dimensions.bottomNavigationHeight}px;

        ${padding({ x: 45, top: 20 })}
      `}
    >
      <ul
        css={css`
          ${flex({ justify: "space-between", align: "center" })};
        `}
      >
        {navList.map(({ icon, href }) => (
          <li key={href}>
            <InternalLink
              href={href}
              css={css`
                path {
                  fill: ${theme.colors.secondary[
                    href === asPath ? "6D" : "D9"
                  ]};
                }
              `}
            >
              {icon}
            </InternalLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavigator;
