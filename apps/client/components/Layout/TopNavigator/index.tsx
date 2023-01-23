import { useNavigationValue } from "@atoms/index";
import { css, useTheme } from "@emotion/react";
import { LeftArrow } from "@svgs/common";
import { flex, padding, position, Spacing } from "@toss/emotion-utils";
import { useOverlay } from "@toss/use-overlay";
import { AnimatePresence, motion } from "framer-motion";
import { AlertModal, MotionButton } from "~/components/Common";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { useInternalRouter } from "~/hooks";

const TopNavigator = () => {
  const { zIndex } = useTheme();
  const { back } = useInternalRouter();
  const state = useNavigationValue();
  const overlay = useOverlay();

  const onClickBackButton = () => {
    if (state.top?.backButtonCaution) {
      overlay.open(({ exit }) => (
        <AlertModal exitFn={exit} rightClickFn={back} rightText="sure" />
      ));

      return;
    }

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
            ${flex({ justify: "space-between", align: "center" })}
            ${padding({
              x: 28,
              top: 31,
              bottom: state.top?.marginBottom ?? 24
            })}
          `}
        >
          <MotionButton onClick={onClickBackButton}>
            <LeftArrow />
          </MotionButton>

          {state.top?.title ? (
            <motion.div
              variants={defaultSlideFadeInVariants("bottom")}
              {...framerMocker}
              css={css`
                ${padding({ top: 20 })}
              `}
            >
              {state.top?.title}
            </motion.div>
          ) : (
            <Spacing size={0} />
          )}

          {state.top?.right ? (
            <MotionButton onClick={state.top.right.onClick}>
              {state.top?.right.element}
            </MotionButton>
          ) : (
            <Spacing size={0} />
          )}
        </nav>
      </header>
    </AnimatePresence>
  );
};

export default TopNavigator;
