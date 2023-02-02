import { useOverlay } from "@toss/use-overlay";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { AlertModal } from "~/components/Common";
import { env } from "~/constants";

export const useOnLogin = () => {
  const { replace } = useRouter();

  const kakaoUrl = `${env.TOPPINGS_SERVER_URL}/oauth2/authorization/kakao?redirect_uri=${env.REDIRECT_URI}`;

  const onLoginHandler = () => {
    replace(kakaoUrl);
  };

  return {
    onLoginHandler
  };
};

export const useCheckInstallPWA = () => {
  const deferredPrompt = useRef<Common.BeforeInstallPromptEvent>();
  const overlay = useOverlay();

  const installPWA = async () => {
    if (deferredPrompt.current) {
      deferredPrompt.current.prompt();
    }
  };

  useEffect(() => {
    const promptHandler = (e: Event) => {
      e.preventDefault();
      deferredPrompt.current = e as Common.BeforeInstallPromptEvent;

      overlay.open(({ exit }) => (
        <AlertModal
          exitFn={exit}
          rightClick={{ fn: installPWA, text: "sure" }}
        />
      ));
    };

    window.addEventListener("beforeinstallprompt", promptHandler);

    return () =>
      window.removeEventListener("beforeinstallprompt", promptHandler);
  }, [overlay]);
};
