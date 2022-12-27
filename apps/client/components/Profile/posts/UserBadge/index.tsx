import { css, useTheme } from "@emotion/react";
import { avatar } from "@images/profile";
import { Flex, gutter, margin, padding, size } from "@toss/emotion-utils";
import Image from "next/image";
import { Text } from "~/components/Common/Typo";
import { useFetchUserInfo } from "~/server/profile";
import { hexToRgba } from "~/utils";

const UserBadge = () => {
  const { colors, weighs } = useTheme();
  const { data: user } = useFetchUserInfo();

  return (
    <Flex.Center
      css={css`
        width: fit-content;
        ${size({
          height: 40
        })}
        ${padding({ x: 18 })};
        ${margin({ top: 60, x: "auto" })};
        ${gutter({ direction: "horizontal", space: 12 })};
        border-radius: 40px;
        box-shadow: 0 4px 4px ${hexToRgba(colors.black, 0.25)};
      `}
    >
      <Image
        src={user.profile || avatar}
        alt={`${user.name}'s profile`}
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
        {user.name}
      </Text>
    </Flex.Center>
  );
};

export default UserBadge;
