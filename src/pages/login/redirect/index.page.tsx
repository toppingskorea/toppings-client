import { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useTokenCookie } from "~/hooks";

const Page: NextPage = () => {
  const router = useRouter();
  const token = router.query.accessToken as string;
  const tokenCookie = useTokenCookie();

  useEffect(() => {
    if (token) {
      tokenCookie.set(token);
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, token]);

  return <div>로딩중</div>;
};

export default Page;
