import { css, useTheme } from "@emotion/react";
import { Skeleton } from "@toppings/components";
import { lastItem } from "@toppings/utils";
import { padding } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { EmptyView } from "~/components/Layout";
import { InfiniteScrollSensor } from "~/components/Util";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { useInternalRouter } from "~/hooks";
import { useFetchUserPosts } from "~/server/profile";
import Item from "./Item";

const PostList = () => {
  const { push } = useInternalRouter();
  const { colors, weighs } = useTheme();
  const { data: posts, fetchNextPage: fetchUserPostsNextPage } =
    useFetchUserPosts();

  if (posts.pages[0].items.length === 0)
    return (
      <EmptyView
        content="No posts"
        CTAButton={
          <motion.button
            {...framerMocker}
            variants={defaultSlideFadeInVariants("bottom")}
            title="move link"
            onClick={() => push("/")}
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
      {posts.pages.map(page =>
        page.items.map(post => <Item key={post.id} post={post} />)
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
