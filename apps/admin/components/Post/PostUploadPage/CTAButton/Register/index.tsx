import { usePostUploadReset, usePostUploadValue } from "@atoms/post";
import { useRestaurantReset, useRestaurantValue } from "@atoms/search";
import { Button } from "@chakra-ui/react";
import { css, useTheme } from "@emotion/react";
import { useCallback } from "react";
import { Text } from "~/components/Common/Typo";
import { types } from "~/constants/data/common";
import { useToast } from "~/hooks";
import { useUploadPost } from "~/server/post";
import useSubmitVerification from "../CTAButton.hooks";

const Register = () => {
  const { colors } = useTheme();
  const toast = useToast();
  const restaurant = useRestaurantValue();
  const restaurantReset = useRestaurantReset();
  const postUploadReset = usePostUploadReset();
  const postUpload = usePostUploadValue();

  const { mutate: uploadPostMutate, isLoading: uploadPostIsLoading } =
    useUploadPost({
      onSuccess: () => {
        restaurantReset();
        postUploadReset();

        toast({
          title: "업로드 성공",
          description: "실제 반영되었습니다.",
          status: "success"
        });
      }
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
      zipcode: "몰라집코드",
      instagramId: postUpload.instagramId
    });
  }, [
    postUpload.description,
    postUpload.images,
    postUpload.instagramId,
    postUpload.type,
    restaurant,
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
