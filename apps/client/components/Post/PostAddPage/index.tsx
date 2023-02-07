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
    (images: string[]) => setPostUpload({ ...postUpload, images }),
    [postUpload, setPostUpload]
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
          <Gallery
            images={[
              "data:image/png;base64,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"
            ]}
            setImages={gallerySetImages}
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
