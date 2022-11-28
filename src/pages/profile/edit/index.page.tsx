import { css, useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { Flex, flex, padding, size, Stack } from "@toss/emotion-utils";
import { FilledButton } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { UserInfo } from "~/components/Profile/edit";
import { useSetNavigation } from "~/hooks";
import { useUpdateUserInfo } from "~/mutations/profile";
import { useEditValue } from "~/recoil/atoms/edit";

const ProfileEdit = () => {
  const theme = useTheme();

  useSetNavigation({
    top: {
      title: undefined,
      right: <Exit />,
      marginBottom: 24
    },
    bottom: true
  });

  const edit = useEditValue();
  const { mutate } = useUpdateUserInfo();

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
        <UserInfo />
        <Flex
          justify="center"
          css={css`
            ${padding({ bottom: theme.dimensions.bottomNavigationHeight + 5 })}
          `}
        >
          <FilledButton
            size={{
              width: 278,
              height: 37
            }}
            bgColor={theme.colors.primary}
            onClick={() => mutate(edit)}
          >
            <Text
              _fontSize={17}
              _color={theme.colors.white}
              weight={theme.weighs.semiBold}
            >
              Register
            </Text>
          </FilledButton>
        </Flex>
      </Stack.Vertical>
    </section>
  );
};

export default ProfileEdit;
