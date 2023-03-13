import { useRouter } from "next/router";
import { env } from "~/constants";

export const useLoginClick = () => {
  const router = useRouter();

  const kakaoUrl = `${env.TOPPINGS_SERVER_URL}/oauth2/authorization/kakao?redirect_uri=${env.REDIRECT_URI}`;

  const onLoginHandler = () => {
    router.replace(kakaoUrl);
  };

  return {
    onLoginHandler
  };
};
