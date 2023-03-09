/* eslint-disable @typescript-eslint/no-non-null-assertion */
// Edit이 랜더링 된다는 것은 postUpload.id 가 있다는 것입니다.
import { usePostUploadReset, usePostUploadValue } from "@atoms/index";
import { useTheme } from "@emotion/react";
import { Stack } from "@toss/emotion-utils";
import { useOverlay } from "@toss/use-overlay";
import { useCallback } from "react";
import { FilledButton, Seek, SuccessModal } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { types } from "~/constants/data/common";
import { useInternalRouter } from "~/hooks";
import { useDeletePost, useUpdatePost } from "~/server/post";
import { usePostSearchRestaurantStore } from "~/stores/post";
import useSubmitVerification from "../CTAButton.hooks";

const Edit = () => {
  const { colors } = useTheme();
  const overlay = useOverlay();
  const router = useInternalRouter();
  const restaurant = usePostSearchRestaurantStore();
  const resetPostSearchRestaurant = usePostSearchRestaurantStore(
    state => state.dispatchInitialize
  );
  const postUploadReset = usePostUploadReset();
  const postUpload = usePostUploadValue();

  // 수정, 삭제 모두 성공했을때 다음 함수를 실행시킵니다.
  const commonOnSuccess = useCallback(() => {
    overlay.open(() => <SuccessModal />);
    setTimeout(() => {
      overlay.close();
      resetPostSearchRestaurant();
      postUploadReset();
      router.replace("/");
    }, 3000);
  }, [overlay, postUploadReset, resetPostSearchRestaurant, router]);

  const { mutate: updatePostMutate, isLoading: updatePostIsLoading } =
    useUpdatePost(() => {
      commonOnSuccess();
    });
  const { mutate: deletePostMutate, isLoading: deletePostIsLoading } =
    useDeletePost(() => {
      commonOnSuccess();
    });

  const { verificationSubmitInClient } = useSubmitVerification({
    images: postUpload.images,
    name: restaurant?.place_name,
    description: postUpload.description,
    type: postUpload.type
  });

  const onEditHandler = useCallback(() => {
    if (verificationSubmitInClient()) return;
    if (!restaurant) {
      return;
    }

    updatePostMutate({
      id: postUpload.id!,
      payload: {
        address: restaurant.address_name,
        code: restaurant.id,
        description: postUpload.description,
        images: postUpload.images,
        latitude: +restaurant.y,
        longitude: +restaurant.x,
        name: restaurant.place_name,
        type: types.filter(({ label }) => label === postUpload.type)[0].value,
        zipcode: "몰라집코드"
      }
    });
  }, [
    postUpload.description,
    postUpload.id,
    postUpload.images,
    postUpload.type,
    restaurant,
    updatePostMutate,
    verificationSubmitInClient
  ]);

  const onDeleteHandler = useCallback(() => {
    deletePostMutate(postUpload.id!);
  }, [deletePostMutate, postUpload.id]);

  return (
    <Stack.Vertical align="center" gutter={12}>
      <FilledButton
        size={{
          width: 278,
          height: 38
        }}
        bgcolor={colors.primary}
        onClick={onEditHandler}
        disabled={updatePostIsLoading}
      >
        {updatePostIsLoading ? (
          <Seek />
        ) : (
          <Text _fontSize={17} _color={colors.white}>
            Edit
          </Text>
        )}
      </FilledButton>
      <FilledButton
        size={{
          width: 278,
          height: 38
        }}
        disabled={deletePostIsLoading}
        bgcolor={colors.secondary.D9}
        onClick={onDeleteHandler}
      >
        {deletePostIsLoading ? (
          <Seek />
        ) : (
          <Text _fontSize={17} _color={colors.white}>
            Delete
          </Text>
        )}
      </FilledButton>
    </Stack.Vertical>
  );
};

export default Edit;
