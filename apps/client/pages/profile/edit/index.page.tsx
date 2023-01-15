import { css } from "@emotion/react";
import { Suspense } from "@suspensive/react";
import { Exit } from "@svgs/common";
import {
  flex,
  padding,
  size,
  Spacing,
  Stack,
  width100
} from "@toss/emotion-utils";
import { RegisterButton, UserInfo } from "~/components/Profile/edit";
import Skeleton from "~/components/Skeleton";
import { useInternalRouter, useSetNavigation } from "~/hooks";
import { generateComponent } from "~/utils";

const ProfileEdit = () => {
  const { push } = useInternalRouter();

  useSetNavigation({
    top: {
      title: undefined,
      right: {
        element: <Exit />,
        onClick: () => push("/map")
      },
      marginBottom: 24
    },
    bottom: true
  });

  return (
    <section
      css={css`
        ${flex({ direction: "column", align: "center" })}
        ${padding({ left: 25, right: 28 })}
      `}
    >
      <Stack.Vertical
        css={css`
          ${size({ width: 340 })}
        `}
      >
        <Suspense.CSROnly
          fallback={
            <Stack.Vertical align="center" gutter={72}>
              <Stack.Vertical>
                <Skeleton.Circle size={88} />
              </Stack.Vertical>
              <Stack.Vertical
                css={css`
                  ${width100}
                `}
              >
                {generateComponent(<Skeleton.Paragraph />, 3)}
              </Stack.Vertical>
            </Stack.Vertical>
          }
        >
          <UserInfo />
        </Suspense.CSROnly>
        <Spacing size={24} />
        <Suspense.CSROnly>
          <RegisterButton />
        </Suspense.CSROnly>
      </Stack.Vertical>
    </section>
  );
};

export default ProfileEdit;
