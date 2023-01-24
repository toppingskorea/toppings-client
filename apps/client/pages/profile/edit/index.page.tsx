import { css, useTheme } from "@emotion/react";
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
import { Text } from "~/components/Common/Typo";
import { RegisterButton, UserInfo } from "~/components/Profile/edit";
import Skeleton from "~/components/Skeleton";
import { OpenGraph } from "~/components/Util";
import { useInternalRouter, useSetNavigation } from "~/hooks";
import { generateComponent } from "~/utils";

const ProfileEdit = () => {
  const { push } = useInternalRouter();
  const { colors, weighs } = useTheme();

  useSetNavigation({
    top: {
      title: (
        <Text _fontSize={19} _color={colors.secondary[47]} weight={weighs.bold}>
          Edit Profile
        </Text>
      ),
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

export default ProfileEdit;
