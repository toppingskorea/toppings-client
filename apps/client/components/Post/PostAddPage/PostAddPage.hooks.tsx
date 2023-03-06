import { usePostUploadState, usePostUploadValue } from "@atoms/post";
import { useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { useOverlay } from "@toss/use-overlay";
import type { ChangeEvent } from "react";
import { useCallback } from "react";
import { AlertModal, Text } from "~/components/Common";
import type { types } from "~/constants/data/common";
import {
  useInternalRouter,
  useSetNavigation as useSetNavigationHook
} from "~/hooks";
import { usePostSearchRestaurantStore } from "~/stores/post";

export const useCheckModifyMode = () => {
  const postUpload = usePostUploadValue();

  return {
    isModifyMode: !!postUpload.id
  };
};

export const useGalleryImages = () => {
  const [postUpload, setPostUpload] = usePostUploadState();

  const gallerySetImages = useCallback(
    (images: string[]) =>
      setPostUpload(postUpload => ({ ...postUpload, images })),
    [setPostUpload]
  );

  return {
    images: postUpload.images,
    setImages: gallerySetImages
  };
};

export const useSetNavigation = () => {
  const { isModifyMode } = useCheckModifyMode();
  const overlay = useOverlay();
  const { colors, weighs } = useTheme();
  const { back } = useInternalRouter();

  useSetNavigationHook({
    top: {
      marginBottom: 35,
      title: (
        <Text _fontSize={19} _color={colors.secondary[47]} weight={weighs.bold}>
          {isModifyMode ? "Edit Post" : "New Post"}
        </Text>
      ),
      right: {
        element: <Exit />,
        onClick: () =>
          overlay.open(({ exit }) => (
            <AlertModal exitFn={exit} rightClick={{ fn: back, text: "sure" }} />
          ))
      },
      backButtonCaution: true,
      hideBackButton: true
    },

    bottom: false
  });
};

export const useInputDescription = () => {
  const [postUpload, setPostUpload] = usePostUploadState();

  const onChangeHandler = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPostUpload(postUpload => ({
      ...postUpload,
      description: e.target.value
    }));
  };

  return {
    value: postUpload.description,
    onChange: onChangeHandler
  };
};

export const useCategory = () => {
  const [postUpload, setPostUpload] = usePostUploadState();

  const onClickHandler = (type: Util.ElementType<typeof types>["label"]) => {
    setPostUpload(postUpload => ({
      ...postUpload,
      type
    }));
  };

  return {
    value: postUpload.type,
    onClick: onClickHandler
  };
};

export const useGetFoundRestaurantField = () => {
  const { placeName, roadAddressName } = usePostSearchRestaurantStore(
    state => ({
      placeName: state.place_name,
      roadAddressName: state.road_address_name
    })
  );

  return {
    placeName,
    roadAddressName
  };
};
