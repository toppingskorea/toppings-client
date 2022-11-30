import { css, useTheme } from "@emotion/react";
import { usePostUploadValue, useRestaurantValue } from "@atoms/index";
import { useCallback } from "react";
import { useOverlay } from "@toss/use-overlay";
import { FilledButton, SuccessModal } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { useUploadPost } from "~/mutations/post";
import { types } from "~/constants/data/common";
import { useInternalRouter } from "~/hooks";

const Register = () => {
  const theme = useTheme();
  const overlay = useOverlay();
  const router = useInternalRouter();
  const restaurant = useRestaurantValue();
  const postUpload = usePostUploadValue();
  const { mutate: uploadPostMutate } = useUploadPost({
    onSuccess: () => {
      overlay.open(() => (
        <SuccessModal description="It will be uploaded after approval from the manager." />
      ));
      setTimeout(() => {
        overlay.close();
        router.replace("/map");
      }, 3000);
    }
  });

  const onRegisterHandler = useCallback(() => {
    if (!restaurant) {
      // TODO: 시연님 토스트 만들어주면 하기
      console.log("식당선택 부탁");
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
    uploadPostMutate
  ]);

  return (
    <FilledButton
      size={{
        width: 278,
        height: 38
      }}
      bgcolor={theme.colors.primary}
      onClick={onRegisterHandler}
      css={css`
        margin: 0 auto;
      `}
    >
      <Text _fontSize={17} _color={theme.colors.white}>
        Register
      </Text>
    </FilledButton>
  );
};

export default Register;
