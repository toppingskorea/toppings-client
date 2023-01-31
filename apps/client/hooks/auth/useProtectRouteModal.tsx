/* eslint-disable @typescript-eslint/no-unused-vars */
import { useOverlay } from "@toss/use-overlay";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { AlertModal } from "~/components/Common";
import { env } from "~/constants";
import { isLoggedIn } from "~/utils";

export const KAKAO_LOGIN_REDIRECT_URI = "kakao_login_redirect_uri";
// 로그인이 필요한 버튼에 onClickProtectedButtonHandler 를 사용합니다.
const useProtectRouteModal = () => {
  const overlay = useOverlay();
  const { replace } = useRouter();
  const [_, setCookie, __] = useCookies();

  const kakaoUrl = `${env.TOPPINGS_SERVER_URL}/oauth2/authorization/kakao?redirect_uri=${env.REDIRECT_URI}`;

  const onLoginHandler = () => {
    setCookie(KAKAO_LOGIN_REDIRECT_URI, window.location.href, {
      expires: dayjs().add(3, "minutes").toDate(),
      path: "/"
    });
    replace(kakaoUrl);
  };

  const onClickProtectedButtonHandler = (callback: VoidFunction) => {
    if (isLoggedIn()) callback();
    else
      overlay.open(({ exit }) => (
        <AlertModal
          exitFn={exit}
          rightClick={{
            fn: onLoginHandler,
            text: "sign in"
          }}
          description="Sign in to access to more feature"
        />
      ));
  };

  return {
    onClickProtectedButtonHandler
  };
};

export default useProtectRouteModal;
