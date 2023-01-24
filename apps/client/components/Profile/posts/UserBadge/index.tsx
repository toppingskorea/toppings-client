import { css, useTheme } from "@emotion/react";
import { grayAvatar } from "@images/common";
import { Flex, gutter, margin, padding, size } from "@toss/emotion-utils";
import Image from "next/image";
import { Text } from "~/components/Common/Typo";
import { useFetchUserInfo } from "~/server/profile";
import { hexToRgba } from "~/utils";

const UserBadge = () => {
  const { colors, weighs } = useTheme();
  const { data: userInfo } = useFetchUserInfo();

  return (
    <Flex.Center
      css={css`
        width: fit-content;
        ${size({
          height: 40
        })}
        ${padding({ x: 18 })};
        ${margin({ x: "auto" })};
        ${gutter({ direction: "horizontal", space: 12 })};
        border-radius: 40px;
        box-shadow: 0 4px 4px ${hexToRgba(colors.black, 0.25)};
      `}
    >
      <Image
        src={userInfo?.profile ?? grayAvatar}
        alt={`${userInfo?.name}'s profile`}
        width={28}
        height={28}
        css={css`
          border-radius: 50%;
        `}
      />
      <Text
        _fontSize={17}
        weight={weighs.semiBold}
        _color={colors.secondary[47]}
      >
        {userInfo?.name}
      </Text>
    </Flex.Center>
  );
};

export default UserBadge;
