import { css } from "@emotion/react";
import { Suspense } from "@suspensive/react";
import { Skeleton } from "@toppings/components";
import {
  flex,
  padding,
  size,
  Spacing,
  Stack,
  width100
} from "@toss/emotion-utils";
import { OpenGraph } from "~/components/Util";
import { generateComponent } from "~/utils";
import { useSetNavigation } from "./ProfileEditPage.hooks";
import RegisterButton from "./RegisterButton";
import UserInfo from "./UserInfo";

const ProfileEditPage = () => {
  useSetNavigation();

  return (
    <section
      css={css`
        ${flex({ direction: "column", align: "center" })}
        ${padding({ left: 25, right: 28 })}
      `}
    >
      <OpenGraph title="Edit Profile" />
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

export default ProfileEditPage;
