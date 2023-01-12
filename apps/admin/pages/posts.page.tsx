import { useSetHeader } from "~/hooks";

const Posts = () => {
  useSetHeader("Posts");
  return <div>posts</div>;
};

export default Posts;
