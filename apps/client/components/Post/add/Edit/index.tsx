/* eslint-disable @typescript-eslint/no-non-null-assertion */
// Edit이 랜더링 된다는 것은 postUpload.id 가 있다는 것입니다.
import {
  usePostUploadReset,
  usePostUploadValue,
  useRestaurantReset,
  useRestaurantValue
} from "@atoms/index";
import { useTheme } from "@emotion/react";
import { Stack } from "@toss/emotion-utils";
import { useOverlay } from "@toss/use-overlay";
import { useCallback } from "react";
import { FilledButton, SuccessModal } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { types } from "~/constants/data/common";
import { useInternalRouter } from "~/hooks";
import { useDeletePost, useUpdatePost } from "~/mutations/post";

const Edit = () => {
  const {colors} = useTheme();
  const overlay = useOverlay();
  const router = useInternalRouter();
  const restaurant = useRestaurantValue();
  const restaurantReset = useRestaurantReset();
  const postUploadReset = usePostUploadReset();
  const postUpload = usePostUploadValue();

  // 수정, 삭제 모두 성공했을때 다음 함수를 실행시킵니다.
  const commonOnSuccess = useCallback(
    (description: string) => {
      overlay.open(() => <SuccessModal description={description} />);
      setTimeout(() => {
        overlay.close();
        restaurantReset();
        postUploadReset();
        router.replace("/map");
      }, 3000);
    },
    [overlay, postUploadReset, restaurantReset, router]
  );

  const { mutate: updatePostMutate } = useUpdatePost(() => {
    commonOnSuccess("The modification is complete.");
  });
  const { mutate: deletePostMutate } = useDeletePost(() => {
    commonOnSuccess("The Deletion is complete.");
  });

  const onEditHandler = useCallback(() => {
    if (!restaurant) {
      // TODO: 시연님 토스트 만들어주면 하기
      console.log("식당선택 부탁");
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
    updatePostMutate
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
      >
        <Text _fontSize={17} _color={colors.white}>
          Edit
        </Text>
      </FilledButton>
      <FilledButton
        size={{
          width: 278,
          height: 38
        }}
        bgcolor={colors.secondary.D9}
        // TODO: 동규님 모달 받으면 모달에서 핸들러 하기
        onClick={onDeleteHandler}
      >
        <Text _fontSize={17} _color={colors.white}>
          Delete
        </Text>
      </FilledButton>
    </Stack.Vertical>
  );
};

export default Edit;
