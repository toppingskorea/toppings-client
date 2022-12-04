import { css, useTheme } from "@emotion/react";
import { AnimatePresence, motion } from "framer-motion";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useNavigationSetter } from "@atoms/index";
import { useInternalRouter } from "~/hooks";
import { useScrollContainer } from "../ScrollContainer";

const PageLoader = () => {
  const { colors } = useTheme();
  const router = useInternalRouter();

  const [isProgressBar, setIsProgressBar] = useState(false);

  const { scrollContainerWidth } = useScrollContainer();
  const setNavigation = useNavigationSetter();

  useEffect(() => {
    const progressBarOn = () => {
      setIsProgressBar(true);
    };

    const progressBarOff = () => {
      setIsProgressBar(false);
    };

    Router.events.on("routeChangeStart", progressBarOn);
    Router.events.on("routeChangeComplete", progressBarOff);
    Router.events.on("routeChangeError", progressBarOff);

    return () => {
      Router.events.off("routeChangeStart", progressBarOn);
      Router.events.off("routeChangeComplete", progressBarOff);
      Router.events.off("routeChangeError", progressBarOff);
    };
  }, [router.asPath, setNavigation]);

  return (
    <AnimatePresence mode="wait">
      {isProgressBar && (
        <div
          css={css`
            position: fixed;
            width: ${scrollContainerWidth}px;
            height: 100%;
          `}
        >
          <motion.div
            animate={{
              width: [
                "0%",
                "80%",
                "81%",
                "82%",
                "83%",
                "84%",
                "85%",
                "86%",
                "87%",
                "88%",
                "89%",
                "90%"
              ],
              transition: { duration: 10 }
            }}
            exit={{ width: `100%`, height: 0 }}
            css={css`
              border-radius: 0 16px 16px 0;
              height: 8px;
              animation-duration: 2s;
              animation-fill-mode: forwards;
              animation-iteration-count: infinite;
              animation-name: placeHolderShimmer;
              animation-timing-function: linear;
              background: linear-gradient(
                to right,
                ${colors.secondary[47]} 8%,
                ${colors.secondary[62]} 18%,
                ${colors.secondary["6D"]} 33%
              );
              background-size: 800px 104px;
              position: absolute;
              top: 0;
              @keyframes placeHolderShimmer {
                0% {
                  background-position: -800px 0;
                }
                100% {
                  background-position: 800px 0;
                }
              }
            `}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            css={css`
              height: 100%;
              background-color: ${colors.secondary.F1};
            `}
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
