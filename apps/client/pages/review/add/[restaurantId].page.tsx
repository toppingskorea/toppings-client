/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useReviewUploadValue } from "@atoms/review";
import { css, useTheme } from "@emotion/react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Flex, padding, Spacing, Stack } from "@toss/emotion-utils";
import { useOverlay } from "@toss/use-overlay";
import axios from "axios";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import {
  AlertModal,
  ComponentWithLabel,
  FilledButton,
  Gallery,
  Input,
  SuccessModal
} from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { env } from "~/constants";
import { useSetNavigation } from "~/hooks";
import { Keys, useFetchRestaurant } from "~/server/restaurant";
import {
  useFetchReview,
  useUpdateReview,
  useUploadReview
} from "~/server/review";

/*
  리뷰를 수정하로 올때 images나 description을 세팅해줄 수 있지만,
  id값만 넘겨주고, review/add 페이지 자체에서 그 id값으로 상세 조회하는것이 더 좋다고 판단했습니다.
  remote date scheme가 바뀌면 인터페이스가 바뀌어야하기 때문에.
  서버사이드에서 데이터를 패칭해주기 위해 리코일을 사용하지 않았습니다.
  ref:https://www.youtube.com/watch?v=HYgKBvLr49c&
*/
const ReviewAdd = ({
  restaurantId
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { replace } = useRouter();
  const { colors, weighs } = useTheme();
  const { data: restaurantDetail } = useFetchRestaurant(+restaurantId);
  const reviewUploadValue = useReviewUploadValue();

  const isModifyMode = useMemo(
    () => !!reviewUploadValue.id,
    [reviewUploadValue.id]
  );

  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  useFetchReview(reviewUploadValue.id, reviewDetail => {
    setImages(reviewDetail.images);
    setDescription(reviewDetail.description);
  });

  useSetNavigation({
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

  const overlay = useOverlay();
  const commonOnSuccessCallback = useCallback(() => {
    overlay.open(() => <SuccessModal />);
    setTimeout(() => {
      overlay.close();
      replace(`/post/${restaurantId}`);
    }, 3000);
  }, [overlay, replace, restaurantId]);

  const { mutate: uploadReviewMutate } = useUploadReview({
    onSuccess: commonOnSuccessCallback
  });
  const { mutate: updateReviewMutate } = useUpdateReview({
    onSuccess: commonOnSuccessCallback
  });

  const onClickRegisterHandler = useCallback(() => {
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
      uploadReviewMutate({
        restaurantId: +restaurantId,
        payload: {
          description,
          images
        }
      });
    }
  }, [
    description,
    images,
    isModifyMode,
    overlay,
    restaurantId,
    reviewUploadValue.id,
    updateReviewMutate,
    uploadReviewMutate
  ]);

  return (
    <Stack.Vertical
      css={css`
        ${padding({ x: 24 })}
      `}
    >
      <ComponentWithLabel label="Picture" gutter={6}>
        <Gallery images={images} setImages={images => setImages(images)} />
      </ComponentWithLabel>

      <ComponentWithLabel label="Description" gutter={6}>
        <Input
          as="textarea"
          height={168}
          placeholder={`Please write a detailed description\nof the food`}
          padding={padding({ x: 12, y: 12 })}
          value={description}
          onChange={e => setDescription(e.currentTarget.value)}
          css={css`
            font-size: 16px;
            &::placeholder {
              color: ${colors.secondary.B8};
            }
          `}
        />
      </ComponentWithLabel>
      <Spacing size={40} />
      <Flex.Center>
        <FilledButton
          size={{
            width: 278,
            height: 37
          }}
          bgcolor={colors.primary}
          onClick={onClickRegisterHandler}
        >
          <Text _fontSize={17} _color={colors.white}>
            Register
          </Text>
        </FilledButton>
      </Flex.Center>
    </Stack.Vertical>
  );
};

export const getServerSideProps: GetServerSideProps<{
  restaurantId: string;
}> = async context => {
  const restaurantId = context.query.restaurantId as string;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(Keys.restaurant(+restaurantId), async () => {
    const { data } = await axios.get<{ data: Restaurant.DetailDTO }>(
      `${env.TOPPINGS_SERVER_URL}/api/v1/restaurant/${restaurantId}`,
      {
        headers: {
          Authorization: `Bearer ${context.req.cookies[env.TOPPINGS_TOKEN_KEY]}`
        }
      }
    );

    return data.data;
  });

  return {
    props: {
      restaurantId,
      dehydratedState: dehydrate(queryClient)
    }
  };
};

export default ReviewAdd;
