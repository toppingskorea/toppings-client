import { useNoticeActivateValue } from "@atoms/noticeActivate";
import { usePostUploadReset } from "@atoms/post";
import { useRestaurantReset } from "@atoms/search";
import type { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import type { ReactNode } from "react";
import { useResetProfileEditPageState } from "~/components/Profile/ProfileEditPage/ProfileEditPage.hooks";
import { useInternalRouter } from "~/hooks";
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

export const useClickNavigationHandler = () => {
  const { push } = useInternalRouter();
  const { resetProfileEditPageState } = useResetProfileEditPageState();
  const resetRestaurant = useRestaurantReset();
  const resetPostUpload = usePostUploadReset();

  const onClickNavigationHandler = (
    href: Util.ElementType<typeof navList>["href"]
  ) => {
    if (href === "/post/add") {
      resetRestaurant();
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
