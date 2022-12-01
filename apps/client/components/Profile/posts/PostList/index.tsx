import { css } from "@emotion/react";
import { padding } from "@toss/emotion-utils";
import useFetchUserPosts from "~/queries/profile/useFetchUserPosts";
import Item from "./Item";

const PostList = () => {
  const { data: posts } = useFetchUserPosts();

  return (
    <ul
      css={css`
        ${padding({ x: 16 })}
      `}
    >
      {posts.map(post => (
        <Item post={post} />
      ))}
    </ul>
  );
};

export default PostList;
