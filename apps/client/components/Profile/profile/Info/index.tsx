import { css, useTheme } from "@emotion/react";
import { avatar } from "@images/profile";
import { Hamburger } from "@svgs/common";
import { flex, gutter, Spacing, Stack } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { ComponentWithLabel, RoundedTag } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { framerMocker, staggerOne } from "~/constants";
import { useInternalRouter, useSetNavigation } from "~/hooks";
import { useFetchUserInfo } from "~/server/profile";
import { hexToRgba } from "~/utils";
import LabelWithEllipse from "../../LabelWithEllipse";

const Info = () => {
  const { colors } = useTheme();
  const { data: userInfo } = useFetchUserInfo();
  const { push } = useInternalRouter();

  useSetNavigation({
    top: {
      right: {
        element: <Hamburger />,
        onClick: () => push("/profile/menu")
      },
      title: (
        <Text _fontSize={24} _color={colors.secondary[47]}>
          {userInfo?.name ?? ""}
        </Text>
      ),
      marginBottom: 33
    },
    bottom: true
  });

  const defaultRoundedTagCommonStyle = {
    padding: {
      x: 20,
      y: 3
    },
    defaultProps: {
      bgcolor: hexToRgba(colors.primary, 0.6),
      bordercolor: colors.primary,
      _color: colors.white
    },
    _fontSize: 15
  };

  return (
    <>
      <Stack.Horizontal align="center" gutter={0} justify="space-between">
        <Image
          src={userInfo.profile || avatar}
          alt={`${userInfo.name}'s profile`}
          width={78}
          height={78}
          css={css`
            min-width: 78px;
            border-radius: 50%;
          `}
        />

        <motion.ul
          variants={staggerOne}
          {...framerMocker}
          css={css`
            ${flex({ direction: "row" })}
            ${gutter({ direction: "horizontal" })}
          `}
        >
          <LabelWithEllipse label="Posts" route="/profile/posts">
            {userInfo.postCount}
          </LabelWithEllipse>
          <LabelWithEllipse label="Saved" route="/profile/saved">
            {userInfo.scrapCount}
          </LabelWithEllipse>
          <LabelWithEllipse label="Reviews" route="/profile/reviews">
            {userInfo.reviewCount}
          </LabelWithEllipse>
        </motion.ul>
      </Stack.Horizontal>

      <Spacing size={58} />

      <ComponentWithLabel label="Nationality" gutter={11}>
        <RoundedTag {...defaultRoundedTagCommonStyle}>
          {userInfo.country}
        </RoundedTag>
      </ComponentWithLabel>

      <Spacing size={26} />

      {userInfo.habits && userInfo.habits?.length > 0 && (
        <ComponentWithLabel label="Eating habit" gutter={11}>
          <RoundedTag {...defaultRoundedTagCommonStyle}>
            {userInfo.habits?.[0].content}
          </RoundedTag>
        </ComponentWithLabel>
      )}
    </>
  );
};

export default Info;