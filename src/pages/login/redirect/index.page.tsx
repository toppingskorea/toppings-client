import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect } from "react";
import { useInternalRouter, useTokenCookie } from "~/hooks";

const Redirect = ({
  accessToken
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useInternalRouter();

  const tokenCookie = useTokenCookie();

  useEffect(() => {
    if (!tokenCookie.get()) tokenCookie.set(accessToken);

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

export default Redirect;
