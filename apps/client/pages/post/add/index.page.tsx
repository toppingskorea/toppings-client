import { usePostUploadState, useRestaurantValue } from "@atoms/index";
import { css, useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { padding, size, Spacing, Stack, touchable } from "@toss/emotion-utils";
import { useMemo } from "react";
import { ComponentWithLabel, Gallery, Input } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { Edit, HorizontalCategories, Register } from "~/components/Post";
import { OpenGraph } from "~/components/Util";
import { useInternalRouter, useSetNavigation } from "~/hooks";
import { hiddenScroll } from "~/styles/emotionUtils";

const PostAdd = () => {
  const { colors, weighs } = useTheme();
  const { push } = useInternalRouter();
  const restaurant = useRestaurantValue();
  const [postUpload, setPostUpload] = usePostUploadState();

  const isModifyMode = useMemo(() => !!postUpload.id, [postUpload.id]);

  useSetNavigation({
    top: {
      marginBottom: 35,
      title: (
        <Text _fontSize={19} _color={colors.secondary[47]} weight={weighs.bold}>
          {isModifyMode ? "Edit Post" : "New Post"}
        </Text>
      ),
      right: {
        element: <Exit />,
        onClick: () => push("/map")
      },
      backButtonCaution: true
    },
    bottom: false
  });

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
            disabled
            value={restaurant?.road_address_name}
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
        <ComponentWithLabel label="Category" gutter={9}>
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
