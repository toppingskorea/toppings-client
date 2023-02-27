import { useNavigationValue } from "@atoms/index";
import { css, useTheme } from "@emotion/react";
import { LeftArrow } from "@svgs/common";
import { Flex, flex, padding, position, Spacing } from "@toss/emotion-utils";
import { useOverlay } from "@toss/use-overlay";
import { AnimatePresence, motion } from "framer-motion";
import { AlertModal, MotionButton } from "~/components/Common";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { useInternalRouter } from "~/hooks";

const TopNavigator = () => {
  const { zIndex } = useTheme();
  const { back, push } = useInternalRouter();
  const state = useNavigationValue();
  const overlay = useOverlay();

  const onClickBackButton = () => {
    if (state.top?.backButtonCaution) {
      overlay.open(({ exit }) => (
        <AlertModal
          exitFn={exit}
          rightClick={{
            fn: () => {
              state.top?.backButtonClickHandler?.();
              back();
            },
            text: "sure"
          }}
        />
      ));

      return;
    }

    if (state.top?.backDirectlyURL) {
      push(state.top.backDirectlyURL);
      return;
    }

    state.top?.backButtonClickHandler?.();

    back();
  };

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
