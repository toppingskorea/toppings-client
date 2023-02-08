import { usePostUploadState, useRestaurantValue } from "@atoms/index";
import { css, useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { padding, size, Spacing, Stack, touchable } from "@toss/emotion-utils";
import { useOverlay } from "@toss/use-overlay";
import { useCallback, useMemo } from "react";
import {
  AlertModal,
  ComponentWithLabel,
  Gallery,
  Input
} from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { OpenGraph } from "~/components/Util";
import { useInternalRouter, useSetNavigation } from "~/hooks";
import { hiddenScroll } from "~/styles/emotionUtils";
import { Edit, Register } from "./CTAButton";
import HorizontalCategories from "./HorizontalCategories";

const PostAddPage = () => {
  const { colors, weighs } = useTheme();
  const { push, back } = useInternalRouter();
  const restaurant = useRestaurantValue();
  const [postUpload, setPostUpload] = usePostUploadState();
  const overlay = useOverlay();

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
        onClick: () =>
          overlay.open(({ exit }) => (
            <AlertModal exitFn={exit} rightClick={{ fn: back, text: "sure" }} />
          ))
      },
      backButtonCaution: true,
      hideBackButton: true
    },

    bottom: false
  });

  const gallerySetImages = useCallback(
    (images: string[]) =>
      setPostUpload(postUpload => ({ ...postUpload, images })),
    [setPostUpload]
  );

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
          <Gallery images={postUpload.images} setImages={gallerySetImages} />
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

export default PostAddPage;
