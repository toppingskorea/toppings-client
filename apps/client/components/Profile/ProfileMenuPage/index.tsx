import { css, useTheme } from "@emotion/react";
import { Logout } from "@svgs/profile";
import {
  Flex,
  flex,
  gutter,
  padding,
  position,
  size,
  Spacing,
  touchable
} from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { MotionButton } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { OpenGraph } from "~/components/Util";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import {
  useAboutAction,
  useLogoutAction,
  useSetNavigation
} from "./ProfileMenuPage.hooks";

const ProfileMenuPage = () => {
  const { colors, weighs, dimensions } = useTheme();

  useSetNavigation();

  const { onClickSignOutButtonHandler } = useLogoutAction();
  const { onClickAboutButtonHandler } = useAboutAction();

  return (
    <section
      css={css`
        ${padding({ x: 22 })}
      `}
    >
      <OpenGraph title="Menu" />

      <motion.button
        onClick={onClickAboutButtonHandler}
        {...framerMocker}
        variants={defaultSlideFadeInVariants("right")}
        css={css`
          ${flex({
            align: "center"
          })}
          ${touchable}
        `}
      >
        <Flex.Center
          css={css`
            border-radius: 50%;
            background-color: ${colors.secondary.D9};
            ${size({
              width: 21,
              height: 21
            })}
            color: ${colors.white};
          `}
        >
          !
        </Flex.Center>
        <Spacing size={7} direction="horizontal" />
        <Text
          _fontSize={17}
          weight={weighs.semiBold}
          _color={colors.secondary[62]}
        >
          About
        </Text>
      </motion.button>

      <MotionButton
        onClick={onClickSignOutButtonHandler}
        css={css`
          ${position("fixed", {
            bottom: dimensions.bottomNavigationHeight,
            right: 22
          })};
          ${flex({ align: "center" })}
          ${gutter({ direction: "horizontal", space: 2 })}
        `}
      >
        <Text
          _fontSize={15}
          weight={weighs.semiBold}
          _color={colors.secondary["6D"]}
        >
          Sign out
        </Text>
        <Logout />
      </MotionButton>
    </section>
  );
};

export default ProfileMenuPage;
