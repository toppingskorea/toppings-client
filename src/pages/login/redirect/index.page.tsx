import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTokenCookie } from "~/hooks";

export default ({
  accessToken
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const tokenCookie = useTokenCookie();

  useEffect(() => {
    tokenCookie.set(accessToken);
    router.replace("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, accessToken]);

  return <div>로딩중</div>;
};

export const getServerSideProps: GetServerSideProps<{
  accessToken: string;
}> = async context => ({
  props: {
    accessToken: context.query.accessToken as string
  }
});
