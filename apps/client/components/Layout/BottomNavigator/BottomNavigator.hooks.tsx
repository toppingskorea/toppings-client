import { useNoticeActivateValue } from "@atoms/noticeActivate";
import { usePostUploadReset } from "@atoms/post";
import type { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import type { ReactNode } from "react";
import { useResetProfileEditPageState } from "~/components/Profile/ProfileEditPage/ProfileEditPage.hooks";
import { useInternalRouter, useProtectRouteModal } from "~/hooks";
import { usePostSearchRestaurantStore } from "~/stores/post";
import type navList from "./BottomNavigator.constants";

export const useRenderIcon = () => {
  const noticeActivate = useNoticeActivateValue();
  const renderIcon = (
    icon: EmotionJSX.Element,
    activatedIcon: ReactNode,
    href: string
  ) => {
    if (href !== "/notice") return icon;

    if (noticeActivate) return activatedIcon;
    return icon;
  };

  return {
    renderIcon
  };
};

const useClickNavigationHandler = () => {
  const { push } = useInternalRouter();
  const { resetProfileEditPageState } = useResetProfileEditPageState();
  const resetPostSearchRestaurant = usePostSearchRestaurantStore(
    state => state.dispatchInitialize
  );
  const resetPostUpload = usePostUploadReset();

  const onClickNavigationHandler = (
    href: Util.ElementType<typeof navList>["href"]
  ) => {
    if (href === "/post/add") {
      resetPostSearchRestaurant();
      resetPostUpload();
    }

    if (href !== "/profile") {
      resetProfileEditPageState();
    }

    push(href);
  };

  return {
    onClickNavigationHandler
  };
};

export const useIconButtonClick = () => {
  const { onClickNavigationHandler } = useClickNavigationHandler();
  const { onClickProtectedButtonHandler } = useProtectRouteModal();

  const onClickIconButtonHandler =
    () => (href: Util.ElementType<typeof navList>["href"]) => {
      if (href === "/") onClickNavigationHandler(href);
      else onClickProtectedButtonHandler(() => onClickNavigationHandler(href));
    };

  return {
    onClickIconButtonHandler
  };
};
