import { Button } from "@chakra-ui/react";
import { css, useTheme } from "@emotion/react";
import { useCallback } from "react";
import { Text } from "~/components/Common/Typo";
import { types } from "~/constants/data/common";
import { useToast } from "~/hooks";
import { useUploadPost } from "~/server/post";
import {
  usePostSearchRestaurantStore,
  usePostUploadStore
} from "~/stores/post";
import useSubmitVerification from "../CTAButton.hooks";

const Register = () => {
  const { colors } = useTheme();
  const toast = useToast();

  const { restaurant, dispatchPostSearchRestaurantInitialize } =
    usePostSearchRestaurantStore(state => ({
      restaurant: state,
      dispatchPostSearchRestaurantInitialize: state.dispatchInitialize
    }));

  const {
    images,
    description,
    type,
    instagramId,
    dispatchPostUploadInitialize
  } = usePostUploadStore(state => ({
    images: state.images,
    description: state.description,
    type: state.type,
    instagramId: state.instagramId,
    dispatchPostUploadInitialize: state.dispatchInitialize
  }));

  const { mutate: uploadPostMutate, isLoading: uploadPostIsLoading } =
    useUploadPost({
      onSuccess: () => {
        dispatchPostSearchRestaurantInitialize();
        dispatchPostUploadInitialize();

        toast({
          title: "업로드 성공",
          description: "실제 반영되었습니다.",
          status: "success"
        });
      }
    });

  const { verificationSubmitInClient } = useSubmitVerification({
    images,
    name: restaurant?.place_name,
    description,
    type
  });

  const onRegisterHandler = useCallback(() => {
    if (verificationSubmitInClient()) return;
    if (!restaurant) {
      return;
    }

    uploadPostMutate({
      address: restaurant.address_name,
      code: restaurant.id,
      description,
      images,
      latitude: +restaurant.y,
      longitude: +restaurant.x,
      name: restaurant.place_name,
      type: types.filter(({ label }) => label === type)[0].value,
      zipcode: "몰라집코드",
      instagramId
    });
  }, [
    description,
    images,
    instagramId,
    restaurant,
    type,
    uploadPostMutate,
    verificationSubmitInClient
  ]);

  return (
    <Button
      onClick={onRegisterHandler}
      disabled={uploadPostIsLoading}
      type="button"
      colorScheme="teal"
      css={css`
        margin: 0 auto;
      `}
    >
      <Text _fontSize={17} _color={colors.white}>
        Register
      </Text>
    </Button>
  );
};

export default Register;
