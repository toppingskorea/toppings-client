import { css } from "@emotion/react";
import { Suspense } from "@suspensive/react";
import { padding, Stack } from "@toss/emotion-utils";
import { EditButton, Info } from "~/components/Profile/profile";
import Skeleton from "~/components/Skeleton";
import { generateComponent } from "~/utils";

const Profile = () => (
  <section
    css={css`
      ${padding({ x: 25 })}
    `}
  >
    <Suspense.CSROnly
      fallback={
        <Stack.Vertical
          css={css`
            padding-top: 140px;
          `}
        >
          <Stack.Horizontal align="center">
            <Skeleton.Circle size={100} />

            <Stack.Horizontal>
              {generateComponent(
                <Skeleton.Box
                  size={{
                    width: 50,
                    height: 50
                  }}
                />,
                3
              )}
            </Stack.Horizontal>
          </Stack.Horizontal>

          <Stack.Vertical>
            {generateComponent(<Skeleton.Paragraph />, 2)}
          </Stack.Vertical>
        </Stack.Vertical>
      }
    >
      <Info />
    </Suspense.CSROnly>

    <EditButton />
  </section>
);
export default Profile;
