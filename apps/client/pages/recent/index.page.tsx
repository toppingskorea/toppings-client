import { css, useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { padding, position, SafeArea, width100 } from "@toss/emotion-utils";
import { useOverlay } from "@toss/use-overlay";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useCallback } from "react";
import {
  Badge,
  RemoveAlertModal,
  RoundedTag,
  SearchInput,
  SSRSafeSuspense
} from "~/components/Common";
import { History } from "~/components/Recent";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { useInput, useSetNavigation } from "~/hooks";
import tags from "./recent.constants";

const RecentPage = () => {
  const theme = useTheme();
  const { push, asPath } = useRouter();
  const overlay = useOverlay();

  useSetNavigation({
    top: {
      marginBottom: 85,
      right: <Exit onClick={() => push("/map")} />
    }
  });

  const { props: keyword, setValue } = useInput({});
  const MemoizeRemoveAlertModal = useCallback(
    (exit: VoidFunction) => <RemoveAlertModal exit={exit} />,
    []
  );

  return (
    <SafeArea>
      <motion.div
        variants={defaultSlideFadeInVariants("right")}
        {...framerMocker}
        css={css`
          ${position("absolute", { top: 114, left: 0 })}
        `}
      >
        <Badge attach="left">Recent</Badge>
      </motion.div>
      <motion.div
        variants={defaultSlideFadeInVariants("left")}
        {...framerMocker}
        css={css`
          ${position("absolute", { top: 114, right: 0 })}
        `}
      >
        <RoundedTag
          padding={{
            x: 10,
            y: 6
          }}
          defaultProps={{
            bgcolor: theme.colors.secondary.F1,
            bordercolor: "transparent",
            _color: theme.colors.secondary.A2
          }}
          _fontSize={13}
          onClick={() => {
            overlay.open(({ exit }) => MemoizeRemoveAlertModal(exit));
          }}
          isTouchable
        >
          remove all
        </RoundedTag>
      </motion.div>

      {/* TODO: skelton */}
      <SSRSafeSuspense fallback={<div>하이</div>}>
        <History />
      </SSRSafeSuspense>

      <div
        css={css`
          ${position("fixed", {
            bottom: theme.dimensions.bottomNavigationHeight,
            left: 27
          })}
        `}
      >
        <div
          css={css`
            width: 100vw;
            overflow-x: scroll;
            &::-webkit-scrollbar {
              display: none;
            }
            scrollbar-width: none;
          `}
        >
          <ul
            css={css`
              display: flex;
              gap: 4px;
              white-space: nowrap;
            `}
          >
            {tags.map(({ ID, NAME }) => (
              <RoundedTag
                key={ID}
                padding={{
                  x: 16,
                  y: 7
                }}
                _fontSize={17}
                defaultProps={{
                  bgcolor: theme.colors.white,
                  bordercolor: theme.colors.secondary.D9
                }}
                onClick={() => push(`${asPath}/${ID}`)}
              >
                {NAME}
              </RoundedTag>
            ))}
          </ul>
        </div>
      </div>

      <div
        css={css`
          ${padding({ x: 16, y: 22 })};
          ${position("fixed", { bottom: 0 })}
          background-color: ${theme.colors.white};
          max-width: ${theme.dimensions.viewWidth - 32}px;
          ${width100}
        `}
      >
        <SearchInput
          onSubmit={() => console.log("sad")}
          placeholder="Enter nationality name"
          setValue={setValue}
          {...keyword}
        />
      </div>
    </SafeArea>
  );
};

export default RecentPage;
