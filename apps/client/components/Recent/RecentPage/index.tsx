import { css, useTheme } from "@emotion/react";
import { Suspense } from "@suspensive/react";
import { Exit } from "@svgs/common";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@toppings/components";
import { position } from "@toss/emotion-utils";
import { useOverlay } from "@toss/use-overlay";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { AlertModal, Badge, RoundedTag } from "~/components/Common";
import { History, TagFamily } from "~/components/Recent";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { useSetNavigation } from "~/hooks";
import { Keys, useDeleteAllRecentHistory } from "~/server/recent";

const RecentPage = () => {
  const { push } = useRouter();
  const { weighs } = useTheme();

  useSetNavigation({
    top: {
      marginBottom: 38,
      right: {
        element: <Exit />,
        onClick: () => push("/map")
      },
      hideBackButton: true
    }
  });

  const { colors } = useTheme();
  const overlay = useOverlay();
  const queryClient = useQueryClient();
  const { mutate: deleteAllMutate } = useDeleteAllRecentHistory({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: Keys.recent()
      });
    }
  });

  const removeAllHistoryHandler = useCallback(() => {
    overlay.open(({ exit, close }) => (
      <AlertModal
        exitFn={exit}
        rightClick={{
          fn: () => {
            deleteAllMutate();
            close();
          },
          text: "delete"
        }}
      />
    ));
  }, [deleteAllMutate, overlay]);

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <motion.div
        variants={defaultSlideFadeInVariants("right")}
        {...framerMocker}
        css={css`
          ${position("absolute", {
            top: 0,
            left: 0
          })}
        `}
      >
        <Badge attach="left">Recent</Badge>
      </motion.div>
      <motion.div
        variants={defaultSlideFadeInVariants("left")}
        {...framerMocker}
        css={css`
          ${position("absolute", {
            top: 5,
            right: 18
          })}
        `}
      >
        <RoundedTag
          padding={{
            x: 10,
            bottom: 3
          }}
          defaultProps={{
            bgcolor: colors.secondary.F1,
            bordercolor: "transparent",
            _color: colors.secondary.A2
          }}
          _fontSize={13}
          onClick={removeAllHistoryHandler}
          isTouchable
          fontWeight={weighs.semiBold}
        >
          remove all
        </RoundedTag>
      </motion.div>

      <Suspense.CSROnly fallback={<Skeleton.Paragraph />}>
        <History />
      </Suspense.CSROnly>

      <TagFamily />
    </div>
  );
};

export default RecentPage;
