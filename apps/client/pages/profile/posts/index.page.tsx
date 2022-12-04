import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Spacing } from "@toss/emotion-utils";
import axios from "axios";
import type { GetServerSideProps } from "next";
import { PostList, UserBadge } from "~/components/Profile/posts";
import { env } from "~/constants";
import { useSetNavigation } from "~/hooks";
import { Keys } from "~/queries/profile";

const ProfilePosts = () => {
  useSetNavigation({
    bottom: true
  });

  return (
    <section>
      <UserBadge />
      <Spacing size={30} />
      <PostList />
    </section>
  );
};

export default ProfilePosts;

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient();

  // 유저 정보
  await queryClient.prefetchQuery(Keys.user(), async () => {
    const { data } = await axios.get<{ data: Profile.UserDTO }>(
      `${env.TOPPINGS_SERVER_URL}/user`,
      {
        headers: {
          Authorization: `Bearer ${context.req.cookies[env.TOPPINGS_TOKEN_KEY]}`
        }
      }
    );
    return data.data;
  });

  // 해당 유저 Posts
  await queryClient.prefetchQuery(Keys.posts(), async () => {
    const { data } = await axios.get<{ data: Profile.PostDTO[] }>(
      `${env.TOPPINGS_SERVER_URL}/user/restaurant`,
      {
        headers: {
          Authorization: `Bearer ${context.req.cookies[env.TOPPINGS_TOKEN_KEY]}`
        }
      }
    );
    return data.data;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};
