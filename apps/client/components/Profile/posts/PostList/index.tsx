import { css } from "@emotion/react";
import { padding } from "@toss/emotion-utils";
import Skeleton from "~/components/Skeleton";
import { InfiniteScrollSensor } from "~/components/Util";
import { useFetchUserPosts } from "~/server/profile";
import { lastItem } from "~/utils/common/lastItem";
import Item from "./Item";

const PostList = () => {
  const { data: posts, fetchNextPage: fetchUserPostsNextPage } =
    useFetchUserPosts();

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
