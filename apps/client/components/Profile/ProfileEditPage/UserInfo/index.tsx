import { useEditState, useProfileEatingHabitChangedValue } from "@atoms/index";
import { css, useTheme } from "@emotion/react";
import { Flex, position, Spacing, width100 } from "@toss/emotion-utils";
import { useMemo } from "react";
import { ComponentWithLabel, Input } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { useInternalRouter } from "~/hooks";
import { useFetchUserInfo } from "~/server/profile";
import ClickableInput from "./ClickableInput";
import ProfileImage from "./ProfileImage";

// 수정할 수 있는 유저의 정보를 나타냅니다.
const UserInfo = () => {
  const { colors, weighs } = useTheme();
  const { push } = useInternalRouter();

  const { data: userInfo } = useFetchUserInfo();
  const [edit, setEdit] = useEditState();

  const isProfileEatingHabitChanged = useProfileEatingHabitChangedValue();

  const eatingHabitPlaceholder = useMemo(() => {
    if (isProfileEatingHabitChanged) {
      if (edit.habits?.length === 0) return "Not Selected";

      return edit.habits && edit.habits[0].content;
    }

    if (!userInfo?.habits) return "Not Selected";

    return userInfo?.habits && userInfo?.habits[0].content;
  }, [isProfileEatingHabitChanged, userInfo?.habits, edit.habits]);

  return (
    <>
      <ProfileImage />

      <Spacing size={22} />

      <ComponentWithLabel label="Username" gutter={9}>
        <Flex
          css={css`
            ${width100}
          `}
        >
          <Spacing size={3} direction="horizontal" />
          <Input
            height={39}
            value={edit.name === undefined ? userInfo?.name : edit.name}
            onChange={e => setEdit({ ...edit, name: e.target.value })}
            absoluteNode={
              <Text
                _fontSize={12}
                weight={weighs.light}
                _color={colors.secondary[66]}
                css={css`
                  ${position("absolute", { bottom: -8, left: 8 })}
                  transform: translate3d(0,100%,0);
                `}
              >
                Enter only english or korean letters (a-z) and numbers within
                6-20
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
          onClick: () => push("/profile/edit/nationality"),
          placeholder: edit.country || userInfo?.country
        }}
      />

      <ClickableInput
        label="Eating habit"
        inputProps={{
          onClick: () => push("/profile/edit/eatingHabits"),
          placeholder: eatingHabitPlaceholder
        }}
      />
    </>
  );
};

export default UserInfo;
