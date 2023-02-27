import { useRestaurantValue } from "@atoms/index";
import { css, useTheme } from "@emotion/react";
import { padding, size, Spacing, Stack, touchable } from "@toss/emotion-utils";
import { ComponentWithLabel, Gallery, Input } from "~/components/Common";
import { OpenGraph } from "~/components/Util";
import { useInternalRouter } from "~/hooks";
import { hiddenScroll } from "~/styles/emotionUtils";
import { Edit, Register } from "./CTAButton";
import HorizontalCategories from "./HorizontalCategories";
import {
  useCategory,
  useCheckModifyMode,
  useGalleryImages,
  useInputDescription,
  useSetNavigation
} from "./PostAddPage.hooks";

const PostAddPage = () => {
  useSetNavigation();
  const { colors } = useTheme();
  const { push } = useInternalRouter();
  const restaurant = useRestaurantValue();
  const { isModifyMode } = useCheckModifyMode();
  const galleryProps = useGalleryImages();
  const descriptionProps = useInputDescription();
  const categoryProps = useCategory();

  return (
    <Stack.Vertical gutter={22}>
      <OpenGraph title="Add Post" />
      <Stack.Vertical
        gutter={22}
        css={css`
          ${padding({ x: 25 })}
        `}
      >
        <ComponentWithLabel label="Picture" gutter={6}>
          <Gallery {...galleryProps} />
        </ComponentWithLabel>

        <ComponentWithLabel label="Name" gutter={6}>
          <Input
            readOnly
            placeholder="Please click to find your restaurant"
            height={39}
            onClick={() => push("/search/restaurant")}
            value={restaurant?.place_name}
            padding={padding({
              x: 11
            })}
            css={css`
              ${touchable}
              overflow-y: hidden;
              font-size: 16px;
              &::placeholder {
                font-size: 16px;
                color: ${colors.secondary.B8};
              }
            `}
          />
        </ComponentWithLabel>

        <ComponentWithLabel label="Location" gutter={6}>
          <Input
            height={40}
            value={restaurant?.road_address_name}
            readOnly
            padding={padding({
              x: 11
            })}
          />
        </ComponentWithLabel>

        <ComponentWithLabel label="Description" gutter={6}>
          <Input
            as="textarea"
            height={156}
            placeholder={`Please write a detailed description\nof the food`}
            padding={padding({ x: 11, y: 12 })}
            {...descriptionProps}
            css={css`
              ${touchable}
              font-size: 16px;
              &::placeholder {
                color: ${colors.secondary.B8};
              }
            `}
          />
        </ComponentWithLabel>
      </Stack.Vertical>

      <div
        css={css`
          ${padding({ left: 25 })}
        `}
      >
        <ComponentWithLabel label="Category" gutter={9}>
          <div
            css={css`
              ${size.width100};
              overflow-x: scroll;
              ${hiddenScroll}
            `}
          >
            <HorizontalCategories {...categoryProps} />
          </div>
        </ComponentWithLabel>
      </div>

      <Spacing size={45} />

      {isModifyMode ? <Edit /> : <Register />}

      <Spacing size={34} />
    </Stack.Vertical>
  );
};

export default PostAddPage;
