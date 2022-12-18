import { css, useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { useQueryClient } from "@tanstack/react-query";
import { position, SafeArea } from "@toss/emotion-utils";
import { useOverlay } from "@toss/use-overlay";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useCallback } from "react";
import {
  AlertModal,
  Badge,
  RoundedTag,
  SSRSafeSuspense
} from "~/components/Common";
import { History } from "~/components/Recent";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { useSetNavigation } from "~/hooks";
import { useDeleteAllRecentHistory } from "~/mutations/recent";
import Keys from "~/queries/recent/keys";
import tags from "./recent.constants";

const RecentPage = () => {
  const { colors, dimensions, zIndexs } = useTheme();
  const { push, asPath } = useRouter();
  const overlay = useOverlay();
  const queryClient = useQueryClient();
  const { mutate: deleteAllMutate } = useDeleteAllRecentHistory({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: Keys.recent()
      });
    }
  });

  useSetNavigation({
    top: {
      marginBottom: 85,
      right: <Exit onClick={() => push("/map")} />
    },
    page: "recent"
  });

  const MemoizeRemoveAlertModal = useCallback(
    (exit: VoidFunction) => (
      <AlertModal
        exitFn={exit}
        deleteFn={() => {
          deleteAllMutate();
          overlay.close();
        }}
      />
    ),
    [deleteAllMutate, overlay]
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
          z-index: ${zIndexs.one};
        `}
      >
        <RoundedTag
          padding={{
            x: 10,
            y: 6
          }}
          defaultProps={{
            bgcolor: colors.secondary.F1,
            bordercolor: "transparent",
            _color: colors.secondary.A2
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
          ${position("absolute", {
            bottom: dimensions.bottomNavigationHeight,
            left: 0
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
                  bgcolor: colors.white,
                  bordercolor: colors.secondary.D9
                }}
                onClick={() => push(`${asPath}/${ID}`)}
              >
                {NAME}
              </RoundedTag>
            ))}
          </ul>
        </div>
      </div>
    </SafeArea>
  );
};

export default RecentPage;
