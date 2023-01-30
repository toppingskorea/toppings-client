import { useTheme } from "@emotion/react";
import { useOverlay } from "@toss/use-overlay";
import { SuccessModal } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import {
  useInternalRouter,
  useSetNavigation as useSetNavigationHook,
  useTokenCookie
} from "~/hooks";
import { useLogout } from "~/server/profile";

export const useSetNavigation = () => {
  const { colors, weighs } = useTheme();

  useSetNavigationHook({
    top: {
      marginBottom: 34,
      title: (
        <Text _fontSize={19} _color={colors.secondary[47]} weight={weighs.bold}>
          Menu
        </Text>
      )
    },
    bottom: true
  });
};

export const useLogoutAction = () => {
  const cookie = useTokenCookie();
  const { replace } = useInternalRouter();

  const overlay = useOverlay();

  const { mutate: logoutMutate } = useLogout({
    onSuccess: () => {
      overlay.open(() => <SuccessModal />);
      setTimeout(() => {
        overlay.close();
        cookie.remove();
        replace("/");
      }, 3000);
    }
  });

  const onClickSignOutButtonHandler = () => logoutMutate();

  return {
    onClickSignOutButtonHandler
  };
};

export const useAboutAction = () => {
  const { push } = useInternalRouter();

  const onClickAboutButtonHandler = () => push("/about");

  return {
    onClickAboutButtonHandler
  };
};
