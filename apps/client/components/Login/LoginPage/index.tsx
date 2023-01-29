import { useRouter } from "next/router";
import { Text } from "~/components/Common/Typo";
import { env } from "~/constants";

const LoginPage = () => {
  const { replace } = useRouter();

  const kakaoUrl = `${env.TOPPINGS_SERVER_URL}/oauth2/authorization/kakao?redirect_uri=${env.REDIRECT_URI}`;

  const handleClickLogin = () => replace(kakaoUrl);

  return (
    <div>
      <button type="button" onClick={handleClickLogin}>
        <Text _fontSize={24}>로그인하기</Text>
      </button>
    </div>
  );
};

export default LoginPage;
