import { css, useTheme } from "@emotion/react";
import { Flex, position, Spacing, width100 } from "@toss/emotion-utils";
import { ComponentWithLabel, Input } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { useInternalRouter } from "~/hooks";
import { useEditState } from "~/recoil/atoms/edit";
import ClickableInput from "./ClickableInput";
import ProfileImage from "./ProfileImage";

// 수정할 수 있는 유저의 정보를 나타냅니다.
const UserInfo = () => {
  const theme = useTheme();
  const router = useInternalRouter();
  const [user, setUser] = useEditState();

  return (
    <>
      <ProfileImage />

      <Spacing size={22} />

      <ComponentWithLabel label="User name" gutter={9}>
        <Flex
          css={css`
            ${width100}
          `}
        >
          <Spacing size={3} direction="horizontal" />
          <Input
            height={39}
            value={user.name}
            onChange={e => setUser({ ...user, name: e.target.value })}
            absoluteNode={
              <Text
                _fontSize={11}
                weight={theme.weighs.light}
                _color={theme.colors.secondary[66]}
                css={css`
                  ${position("absolute", { bottom: -8, left: 8 })}
                  transform: translate3d(0,100%,0);
                `}
              >
                enter only english letters (a-z) and numbers within 6-20
                {"\n"}characters for the user name.
              </Text>
            }
            css={css`
              font-size: 16px;
            `}
          />
        </Flex>
      </ComponentWithLabel>

      <Spacing size={50} direction="horizontal" />

      <ClickableInput
        label="Nationality"
        inputProps={{
          onClick: () => router.push("/profile/edit/nationality"),
          placeholder: user.country
        }}
      />

      <ClickableInput
        label="Eating habit"
        inputProps={{
          onClick: () => router.push("/profile/edit/eatingHabits"),
          placeholder: user.habits[0].content
        }}
      />
    </>
  );
};

export default UserInfo;
