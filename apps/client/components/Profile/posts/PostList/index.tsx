import { css } from "@emotion/react";
import { padding } from "@toss/emotion-utils";
import { useFetchUserPosts } from "~/server/profile";
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
        <Item key={post.id} post={post} />
      ))}
    </ul>
  );
};

export default PostList;
