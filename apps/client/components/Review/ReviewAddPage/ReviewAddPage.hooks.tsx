/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useReviewUploadValue } from "@atoms/review";
import { useTheme } from "@emotion/react";
import { useOverlay } from "@toss/use-overlay";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState, type ChangeEvent } from "react";
import { AlertModal, SuccessModal } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { useSetNavigation as useSetNavigationHook } from "~/hooks";
import { useSendNotification } from "~/server/notice";
import { useFetchRestaurant } from "~/server/restaurant";
import {
  useFetchReview,
  useUpdateReview,
  useUploadReview
} from "~/server/review";

export const useSetNavigation = ({
  restaurantId
}: {
  restaurantId: string;
}) => {
  const { colors, weighs } = useTheme();
  const { data: restaurantDetail } = useFetchRestaurant(+restaurantId);

  useSetNavigationHook({
    top: {
      title: (
        <Text
          _fontSize={20}
          _color={colors.secondary[69]}
          weight={weighs.semiBold}
        >
          {restaurantDetail.name}
        </Text>
      ),
      backButtonCaution: true
    }
  });
};

export const useAddReview = ({ restaurantId }: { restaurantId: string }) => {
  const reviewUploadValue = useReviewUploadValue();

  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");

  useFetchReview(reviewUploadValue.id, reviewDetail => {
    setImages(reviewDetail.images);
    setDescription(reviewDetail.description);
  });

  const { onClickRegisterHandler } = useClickRegisterHandler({
    images,
    description,
    restaurantId
  });

  const onChangeImagesHandler = (images: string[]) => setImages(images);
  const onChangeDescriptionHandler = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setDescription(event.currentTarget.value);

  return {
    images,
    description,
    onClickRegisterHandler,
    onChangeImagesHandler,
    onChangeDescriptionHandler
  };
};

const useClickRegisterHandler = ({
  images,
  description,
  restaurantId
}: {
  images: string[];
  description: string;
  restaurantId: string;
}) => {
  const { replace } = useRouter();
  const reviewUploadValue = useReviewUploadValue();

  const isModifyMode = useMemo(
    () => !!reviewUploadValue.id,
    [reviewUploadValue.id]
  );

  const overlay = useOverlay();
  const commonOnSuccessCallback = useCallback(() => {
    overlay.open(() => <SuccessModal />);
    setTimeout(() => {
      overlay.close();
      replace(`/post/${restaurantId}`);
    }, 3000);
  }, [overlay, replace, restaurantId]);

  const { mutateAsync: uploadReviewMutateAsync } = useUploadReview({
    onSuccess: commonOnSuccessCallback
  });
  const { mutate: updateReviewMutate } = useUpdateReview({
    onSuccess: commonOnSuccessCallback
  });
  const { mutate: sendNotificationMutate } = useSendNotification();

  const onClickRegisterHandler = useCallback(async () => {
    if (images.length === 0) {
      overlay.open(({ exit }) => (
        <AlertModal
          information={`It can't be uploaded\nwithout pictures`}
          exitFn={exit}
        />
      ));
      return;
    }

    if (isModifyMode) {
      updateReviewMutate({
        id: reviewUploadValue.id!,
        payload: {
          description,
          images
        }
      });
    } else {
      const result = await uploadReviewMutateAsync({
        restaurantId: +restaurantId,
        payload: {
          description,
          images
        }
      });

      if (result.success)
        sendNotificationMutate({
          id: Number(restaurantId),
          type: "Review"
        });
    }
  }, [
    description,
    images,
    isModifyMode,
    overlay,
    restaurantId,
    reviewUploadValue.id,
    sendNotificationMutate,
    updateReviewMutate,
    uploadReviewMutateAsync
  ]);

  return {
    onClickRegisterHandler
  };
};
