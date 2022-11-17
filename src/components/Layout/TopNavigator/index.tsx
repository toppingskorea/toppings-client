import { css } from "@emotion/react";
import { LeftArrow } from "@svgs/common";
import { flex, padding, Spacing } from "@toss/emotion-utils";
import { AnimatePresence, motion } from "framer-motion";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { useInternalRouter } from "~/hooks";
import { useNavigationValue } from "~/recoil/atoms";

const TopNavigator = () => {
  const router = useInternalRouter();
  const state = useNavigationValue();

  return (
    <AnimatePresence>
      <nav
        css={css`
          ${flex({ justify: "space-between", align: "center" })}
          ${padding({ x: 28, top: 56, bottom: state.top?.marginBottom ?? 24 })}
        `}
      >
        <motion.button
          type="button"
          onClick={() => router.back()}
          whileTap={{ scale: 0.9 }}
        >
          <LeftArrow />
        </motion.button>

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
          <motion.div whileTap={{ scale: 0.9 }}>{state.top?.right}</motion.div>
        ) : (
          <Spacing size={0} />
        )}
      </nav>
    </AnimatePresence>
  );
};

export default TopNavigator;
