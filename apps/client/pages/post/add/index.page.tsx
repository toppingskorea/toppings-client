import { css, useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { padding, size, Spacing, Stack, touchable } from "@toss/emotion-utils";
import { useState } from "react";
import {
  ComponentWithLabel,
  FilledButton,
  Gallery,
  Input
} from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { HorizontalCategories } from "~/components/Post";
import { useSetNavigation } from "~/hooks";
import { hiddenScroll } from "~/styles/emotionUtils";
import dummyImages from "./dummy.constants";

const PostAdd = () => {
  const theme = useTheme();

  useSetNavigation({
    top: {
      marginBottom: 35,
      right: <Exit />
    },
    bottom: true
  });

  const [type, setType] = useState<string>("");

  return (
    <Stack.Vertical gutter={22}>
      <Stack.Vertical
        gutter={22}
        css={css`
          ${padding({ x: 25 })}
        `}
      >
        <ComponentWithLabel label="Picture" gutter={6}>
          <Gallery images={dummyImages} />
        </ComponentWithLabel>

        <ComponentWithLabel label="Name" gutter={6}>
          <Input
            as="textarea"
            height={58}
            readOnly
            placeholder={`Please write a restaurant name\nyou want to review`}
            padding={padding({ x: 15, y: 10 })}
            css={css`
              ${touchable}
              overflow-y: hidden;
              &::placeholder {
                font-size: 16px;
                color: ${theme.colors.secondary.B8};
              }
            `}
          />
        </ComponentWithLabel>

        <ComponentWithLabel label="Location" gutter={6}>
          <Input height={40} readOnly />
        </ComponentWithLabel>

        <ComponentWithLabel label="Description" gutter={6}>
          <Input
            as="textarea"
            height={156}
            placeholder={`Please write a detailed description\nof the food`}
            padding={padding({ x: 12, y: 12 })}
            css={css`
              ${touchable}
              font-size: 16px;
              &::placeholder {
                color: ${theme.colors.secondary.B8};
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
              value={type}
              onClick={type => setType(type)}
            />
          </div>
        </ComponentWithLabel>
      </div>
      <Spacing size={75} />

      <FilledButton
        size={{
          width: 278,
          height: 38
        }}
        bgColor={theme.colors.primary}
        css={css`
          margin: 0 auto;
        `}
      >
        <Text _fontSize={17} _color={theme.colors.white}>
          Register
        </Text>
      </FilledButton>

      <Spacing size={theme.dimensions.bottomNavigationHeight + 34} />
    </Stack.Vertical>
  );
};

export default PostAdd;
