import { css, useTheme } from "@emotion/react";
import { avatar } from "@images/profile";
import { Hamburger } from "@svgs/common";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import {
  flex,
  gutter,
  padding,
  position,
  SafeArea,
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
import { useFetchUserInfo } from "~/queries/profile";
import Keys from "~/queries/profile/keys";

const Profile = () => {
  const theme = useTheme();
  const { data } = useFetchUserInfo();
  const router = useInternalRouter();

  useSetNavigation({
    top: {
      right: (
        <motion.button
          onClick={() => router.push("/profile/menu")}
          title="메뉴 바로가기"
        >
          <Hamburger />
        </motion.button>
      ),
      title: (
        <Text _fontSize={24} _color={theme.colors.secondary[47]}>
          {data?.name ?? ""}
        </Text>
      ),
      marginBottom: 33
    },
    bottom: true
  });

  return (
    <SafeArea>
      <section
        css={css`
          ${padding({ x: 25 })}
        `}
      >
        <Stack.Horizontal align="center" gutter={37}>
          <Image
            src={data.profile || avatar}
            alt="dummy"
            width={88}
            height={88}
            css={css`
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
              {data.postCount}
            </LabelWithEllipse>
            <LabelWithEllipse label="Saved" route="/profile/saved">
              {data.scrapCount}
            </LabelWithEllipse>
            <LabelWithEllipse label="Reviews" route="/profile/reviews">
              {data.reviewCount}
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
              bgColor: theme.colors.primary,
              bordercolor: "transparent",
              _color: theme.colors.white
            }}
            _fontSize={15}
          >
            {data.country}
          </RoundedTag>
        </ComponentWithLabel>
        <Spacing size={26} />
        <ComponentWithLabel label="Eating habit" gutter={11}>
          <RoundedTag
            padding={{
              x: 20,
              y: 7
            }}
            defaultProps={{
              bgColor: theme.colors.primary,
              bordercolor: "transparent",
              _color: theme.colors.white
            }}
            _fontSize={15}
          >
            {data.habits[0].content}
          </RoundedTag>
        </ComponentWithLabel>
        <motion.div
          variants={defaultSlideFadeInVariants("bottom")}
          {...framerMocker}
          css={css`
            ${position("fixed", {
              bottom: theme.dimensions.bottomNavigationHeight + 34,
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
            bgColor={theme.colors.primary}
            onClick={() => router.push("/profile/edit")}
          >
            <Text
              _fontSize={17}
              _color={theme.colors.white}
              weight={theme.weighs.semiBold}
            >
              Edit profile
            </Text>
          </FilledButton>
        </motion.div>
      </section>
    </SafeArea>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(Keys.user(), async () => {
    const { data } = await axios.get<{ data: Profile.UserDTO }>(
      `${env.TOPPINGS_SERVER_URL}/user`,
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
