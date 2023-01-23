import { css, useTheme } from "@emotion/react";
import { padding } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import Skeleton from "~/components/Skeleton";
import { InfiniteScrollSensor } from "~/components/Util";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { useInternalRouter } from "~/hooks";
import { useFetchUserPosts } from "~/server/profile";
import { lastItem } from "~/utils/common/lastItem";
import EmptyView from "../../EmptyView";
import Item from "./Item";

const PostList = () => {
  const { push } = useInternalRouter();
  const { colors, weighs } = useTheme();
  const { data: posts, fetchNextPage: fetchUserPostsNextPage } =
    useFetchUserPosts();

  if (posts.pages.length === 0)
    return (
      <EmptyView
        content="No posts"
        CTAButton={
          <motion.button
            {...framerMocker}
            variants={defaultSlideFadeInVariants("bottom")}
            title="move link"
            onClick={() => push("/map")}
            css={css`
              ${padding({
                x: 28,
                y: 4
              })}
              margin-top: 11px;
              background-color: ${colors.secondary.D9};
              border-radius: 100px;
              font-size: 12px;
              font-weight: ${weighs.bold};
              color: ${colors.secondary[69]};
            `}
          >
            Go to write a post
          </motion.button>
        }
      />
    );

  return (
    <ul
      css={css`
        ${padding({ x: 16 })}
      `}
    >
      {posts.pages.map(post =>
        post.items.map(post => <Item key={post.id} post={post} />)
      )}

      {lastItem(posts.pages)?.page !== lastItem(posts.pages)?.totalPage && (
        <InfiniteScrollSensor
          onIntersected={() => {
            fetchUserPostsNextPage();
          }}
          render={ref => (
            <Skeleton.Box
              ref={ref}
              size={{
                width: "100%",
                height: 150
              }}
            />
          )}
        />
      )}
    </ul>
  );
};

export default PostList;
