import { css, useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { padding, Stack } from "@toss/emotion-utils";
import { ComponentWithLabel, Gallery } from "~/components/Common";
import { useSetNavigation } from "~/hooks";
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

        <div>Name</div>
        <div>location</div>
        <div>description</div>
      </Stack.Vertical>

      <div>category</div>
    </Stack.Vertical>
  );
};

export default PostAdd;
