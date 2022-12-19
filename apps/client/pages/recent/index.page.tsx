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
import { History, TagFamily } from "~/components/Recent";
import Skeleton from "~/components/Skeleton";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { useSetNavigation } from "~/hooks";
import { useDeleteAllRecentHistory } from "~/mutations/recent";
import Keys from "~/queries/recent/keys";

const RecentPage = () => {
  const { colors, zIndexs } = useTheme();
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
    }
  });

  const removeAllHistoryHandler = useCallback(() => {
    overlay.open(({ exit, close }) => (
      <AlertModal
        exitFn={exit}
        deleteFn={() => {
          deleteAllMutate();
          close();
        }}
      />
    ));
  }, [deleteAllMutate, overlay]);

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
          onClick={removeAllHistoryHandler}
          isTouchable
        >
          remove all
        </RoundedTag>
      </motion.div>

      <SSRSafeSuspense fallback={<Skeleton.Paragraph />}>
        <History />
      </SSRSafeSuspense>

      <div
        css={css`
          ${position("absolute", {
            bottom: 10,
            left: 0
          })}
          backdrop-filter: blur(10px);
        `}
      >
        <TagFamily />
      </div>
    </SafeArea>
  );
};

export default RecentPage;
