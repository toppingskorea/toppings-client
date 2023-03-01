import { useNavigationValue } from "@atoms/index";
import { css, useTheme } from "@emotion/react";
import { LeftArrow } from "@svgs/common";
import { Flex, flex, padding, position, Spacing } from "@toss/emotion-utils";
import { AnimatePresence, motion } from "framer-motion";
import { MotionButton } from "~/components/Common";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { useClickBackButton } from "./TopNavigator.hooks";

const TopNavigator = () => {
  const { zIndex } = useTheme();
  const state = useNavigationValue();

  const { onClickBackButton } = useClickBackButton();

  return (
    <AnimatePresence>
      <header
        css={css`
          ${position("sticky", { top: 0 })}
          z-index: ${zIndex.one};
        `}
      >
        <nav
          css={css`
            ${flex({ direction: "column" })}
            ${padding({
              x: 28,
              top: 31,
              bottom: state.top?.marginBottom ?? 24
            })}
            
            background-color: white;
          `}
        >
          {state.top?.hideBackButton && !state.top.right ? (
            <Spacing size={28} />
          ) : (
            <Flex justify="space-between">
              {state.top?.hideBackButton ? (
                <div id="dummy-element" />
              ) : (
                <MotionButton onClick={onClickBackButton}>
                  <LeftArrow />
                </MotionButton>
              )}

              {state.top?.right ? (
                <MotionButton onClick={state.top.right.onClick}>
                  {state.top?.right.element}
                </MotionButton>
              ) : (
                <Spacing size={0} />
              )}
            </Flex>
          )}

          {state.top?.title && (
            <motion.div
              variants={defaultSlideFadeInVariants("bottom")}
              {...framerMocker}
              css={css`
                width: fit-content;
                margin: -10px auto 0;
                ${flex({
                  justify: "center",
                  align: "center"
                })}
              `}
            >
              {state.top?.title}
            </motion.div>
          )}
        </nav>
      </header>
    </AnimatePresence>
  );
};

export default TopNavigator;
