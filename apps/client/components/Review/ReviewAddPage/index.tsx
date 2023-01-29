/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { css, useTheme } from "@emotion/react";
import { Flex, padding, Spacing, Stack } from "@toss/emotion-utils";
import {
  ComponentWithLabel,
  FilledButton,
  Gallery,
  Input
} from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { OpenGraph } from "~/components/Util";

import { useAddReview, useSetNavigation } from "./ReviewAddPage.hooks";

/*
  리뷰를 수정하로 올때 images나 description을 세팅해줄 수 있지만,
  id값만 넘겨주고, review/add 페이지 자체에서 그 id값으로 상세 조회하는것이 더 좋다고 판단했습니다.
  remote date scheme가 바뀌면 인터페이스가 바뀌어야하기 때문에.
  서버사이드에서 데이터를 패칭해주기 위해 리코일을 사용하지 않았습니다.
  ref:https://www.youtube.com/watch?v=HYgKBvLr49c&
*/
const ReviewAddPage = ({ restaurantId }: { restaurantId: string }) => {
  const { colors } = useTheme();

  useSetNavigation({ restaurantId });

  const {
    images,
    description,
    onClickRegisterHandler,
    onChangeImagesHandler,
    onChangeDescriptionHandler
  } = useAddReview({ restaurantId });

  return (
    <Stack.Vertical
      css={css`
        ${padding({ x: 24 })}
      `}
    >
      <OpenGraph title="Add Review" />
      <ComponentWithLabel label="Picture" gutter={6}>
        <Gallery images={images} setImages={onChangeImagesHandler} />
      </ComponentWithLabel>
      <ComponentWithLabel label="Description" gutter={6}>
        <Input
          as="textarea"
          height={168}
          placeholder={`Please write a detailed description\nof the food`}
          padding={padding({ x: 12, y: 12 })}
          value={description}
          onChange={onChangeDescriptionHandler}
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

export default ReviewAddPage;
