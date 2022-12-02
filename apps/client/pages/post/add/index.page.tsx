import {
  usePostUploadReset,
  usePostUploadState,
  useRestaurantReset,
  useRestaurantValue
} from "@atoms/index";
import { css, useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { padding, size, Spacing, Stack, touchable } from "@toss/emotion-utils";
import { useEffect, useMemo } from "react";
import { ComponentWithLabel, Gallery, Input } from "~/components/Common";
import { Edit, HorizontalCategories, Register } from "~/components/Post";
import { useInternalRouter, useSetNavigation } from "~/hooks";
import { hiddenScroll } from "~/styles/emotionUtils";

const PostAdd = () => {
  const { colors } = useTheme();
  const { push } = useInternalRouter();
  const restaurant = useRestaurantValue();
  const [postUpload, setPostUpload] = usePostUploadState();
  const restaurantReset = useRestaurantReset();
  const postUploadReset = usePostUploadReset();

  const isModifyMode = useMemo(() => !!postUpload.id, [postUpload.id]);

  useSetNavigation({
    top: {
      marginBottom: 35,
      right: <Exit />
    },
    bottom: true
  });
  useEffect(() => {
    return () => {
      restaurantReset();
      postUploadReset();
    };
  }, [postUploadReset, restaurantReset]);

  return (
    <Stack.Vertical gutter={22}>
      <Stack.Vertical
        gutter={22}
        css={css`
          ${padding({ x: 25 })}
        `}
      >
        <ComponentWithLabel label="Picture" gutter={6}>
          <Gallery
            images={postUpload.images}
            setImages={images => setPostUpload({ ...postUpload, images })}
          />
        </ComponentWithLabel>

        <ComponentWithLabel label="Name" gutter={6}>
          <Input
            readOnly
            placeholder="Please click to find your restaurant"
            height={39}
            onClick={() => push("/search/restaurant")}
            value={restaurant?.place_name}
            css={css`
              ${touchable}
              overflow-y: hidden;
              &::placeholder {
                font-size: 16px;
                color: ${colors.secondary.B8};
              }
            `}
          />
        </ComponentWithLabel>

        <ComponentWithLabel label="Location" gutter={6}>
          <Input height={40} disabled value={restaurant?.road_address_name} />
        </ComponentWithLabel>

        <ComponentWithLabel label="Description" gutter={6}>
          <Input
            as="textarea"
            height={156}
            placeholder={`Please write a detailed description\nof the food`}
            padding={padding({ x: 12, y: 12 })}
            value={postUpload.description}
            onChange={e =>
              setPostUpload({ ...postUpload, description: e.target.value })
            }
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
        <ComponentWithLabel label="Category">
          <div
            css={css`
              ${size.width100};
              overflow-x: scroll;
              ${hiddenScroll}
            `}
          >
            <HorizontalCategories
              value={postUpload.type}
              onClick={type => setPostUpload({ ...postUpload, type })}
            />
          </div>
        </ComponentWithLabel>
      </div>

      <Spacing size={45} />

      {isModifyMode ? <Edit /> : <Register />}

      <Spacing size={34} />
    </Stack.Vertical>
  );
};

export default PostAdd;
