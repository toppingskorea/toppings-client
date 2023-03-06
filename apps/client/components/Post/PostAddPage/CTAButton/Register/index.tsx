import { usePostUploadReset, usePostUploadValue } from "@atoms/index";
import { css, useTheme } from "@emotion/react";
import { useOverlay } from "@toss/use-overlay";
import { useCallback } from "react";
import { FilledButton, Seek, SuccessModal } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { types } from "~/constants/data/common";
import { useInternalRouter } from "~/hooks";
import { useUploadPost } from "~/server/post";
import { usePostSearchRestaurantStore } from "~/stores/post";
import useSubmitVerification from "../CTAButton.hooks";

const Register = () => {
  const { colors } = useTheme();
  const overlay = useOverlay();
  const router = useInternalRouter();
  const restaurant = usePostSearchRestaurantStore();
  const resetPostSearchRestaurant = usePostSearchRestaurantStore(
    state => state.dispatchInitialize
  );
  const postUploadReset = usePostUploadReset();
  const postUpload = usePostUploadValue();

  const { mutate: uploadPostMutate, isLoading: uploadPostIsLoading } =
    useUploadPost(() => {
      resetPostSearchRestaurant();
      postUploadReset();
      overlay.open(() => <SuccessModal />);
      setTimeout(() => {
        overlay.close();
        router.replace("/");
      }, 3000);
    });

  const { verificationSubmitInClient } = useSubmitVerification({
    images: postUpload.images,
    name: restaurant?.place_name,
    description: postUpload.description,
    type: postUpload.type
  });

  const onRegisterHandler = useCallback(() => {
    if (verificationSubmitInClient()) return;
    if (!restaurant) {
      return;
    }

    uploadPostMutate({
      address: restaurant.address_name,
      code: restaurant.id,
      description: postUpload.description,
      images: postUpload.images,
      latitude: +restaurant.y,
      longitude: +restaurant.x,
      name: restaurant.place_name,
      type: types.filter(({ label }) => label === postUpload.type)[0].value,
      zipcode: "몰라집코드"
    });
  }, [
    postUpload.description,
    postUpload.images,
    postUpload.type,
    restaurant,
    uploadPostMutate,
    verificationSubmitInClient
  ]);

  return (
    <FilledButton
      size={{
        width: 278,
        height: 38
      }}
      bgcolor={colors.primary}
      onClick={onRegisterHandler}
      disabled={uploadPostIsLoading}
      css={css`
        margin: 0 auto;
      `}
    >
      {uploadPostIsLoading ? (
        <Seek />
      ) : (
        <Text _fontSize={17} _color={colors.white}>
          Register
        </Text>
      )}
    </FilledButton>
  );
};

export default Register;
