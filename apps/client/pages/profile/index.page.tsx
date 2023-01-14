import { css, useTheme } from "@emotion/react";
import { avatar } from "@images/profile";
import { Hamburger } from "@svgs/common";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import {
  flex,
  gutter,
  padding,
  position,
  Spacing,
  Stack
} from "@toss/emotion-utils";
import axios from "axios";
import { motion } from "framer-motion";
import type { GetServerSideProps } from "next";
import Image from "next/image";
import {
  ComponentWithLabel,
  FilledButton,
  RoundedTag
} from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { LabelWithEllipse } from "~/components/Profile";
import {
  defaultSlideFadeInVariants,
  env,
  framerMocker,
  staggerOne
} from "~/constants";
import { useInternalRouter, useSetNavigation } from "~/hooks";
import { Keys, useFetchUserInfo } from "~/server/profile";

const Profile = () => {
  const { colors, weighs, dimensions } = useTheme();
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

  return (
    <section
      css={css`
        ${padding({ x: 25 })}
      `}
    >
      <Stack.Horizontal align="center" gutter={0} justify="space-between">
        <Image
          src={userInfo.profile || avatar}
          alt={`${userInfo.name}'s profile`}
          width={88}
          height={88}
          css={css`
            min-width: 88px;
            border-radius: 50%;
          `}
        />

        <motion.ul
          variants={staggerOne}
          {...framerMocker}
          css={css`
            ${flex({ direction: "row" })}
            ${gutter({ direction: "horizontal", space: 24 })}
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
        <RoundedTag
          padding={{
            x: 20,
            y: 7
          }}
          defaultProps={{
            bgcolor: colors.primary,
            bordercolor: "transparent",
            _color: colors.white
          }}
          _fontSize={15}
        >
          {userInfo.country}
        </RoundedTag>
      </ComponentWithLabel>
      <Spacing size={26} />
      {userInfo.habits && userInfo.habits?.length > 0 && (
        <ComponentWithLabel label="Eating habit" gutter={11}>
          <RoundedTag
            padding={{
              x: 20,
              y: 7
            }}
            defaultProps={{
              bgcolor: colors.primary,
              bordercolor: "transparent",
              _color: colors.white
            }}
            _fontSize={15}
          >
            {userInfo.habits?.[0].content}
          </RoundedTag>
        </ComponentWithLabel>
      )}
      <motion.div
        variants={defaultSlideFadeInVariants("bottom")}
        {...framerMocker}
        css={css`
          ${position("fixed", {
            bottom: dimensions.bottomNavigationHeight + 34,
            left: 0,
            right: 0
          })}
          ${flex({ justify: "center" })}
        `}
      >
        <FilledButton
          size={{
            width: 278,
            height: 37
          }}
          bgcolor={colors.primary}
          onClick={() => push("/profile/edit")}
        >
          <Text _fontSize={17} _color={colors.white} weight={weighs.semiBold}>
            Edit profile
          </Text>
        </FilledButton>
      </motion.div>
    </section>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(Keys.user(), async () => {
    const { data } = await axios.get<{ data: Profile.UserDTO }>(
      `${env.TOPPINGS_SERVER_URL}/api/v1/user`,
      {
        headers: {
          Authorization: `Bearer ${context.req.cookies[env.TOPPINGS_TOKEN_KEY]}`
        }
      }
    );
    return data.data;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};
