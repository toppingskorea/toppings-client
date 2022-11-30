import { useRouter } from "next/router";
import React from "react";
import { env } from "~/constants";
import { Text } from "~/components/Common/Typo";

const Login = () => {
  const router = useRouter();

  const kakaoUrl = `${env.TOPPINGS_SERVER_URL}/oauth2/authorization/kakao?redirect_uri=${env.REDIRECT_URI}`;

  const handleClickLogin = () => {
    router.replace(kakaoUrl);
  };
  return (
    <div>
      <button type="button" onClick={handleClickLogin}>
        <Text _fontSize={24}>로그인하기</Text>
      </button>
    </div>
  );
};

export default Login;
