import { css, useTheme } from "@emotion/react";
import { avatar } from "@images/profile";
import { Exit, OrangePlus } from "@svgs/common";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import {
  Flex,
  flex,
  gutter,
  padding,
  position,
  SafeArea,
  size,
  Spacing,
  Stack,
  touchable,
  width100
} from "@toss/emotion-utils";
import axios from "axios";
import type { GetServerSideProps } from "next";
import Image from "next/image";
import { ComponentWithLabel, Input } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { env } from "~/constants";
import { useInput, useInternalRouter, useSetNavigation } from "~/hooks";
import { useFetchUserInfo } from "~/queries/profile";
import Keys from "~/queries/profile/keys";

const ProfileEdit = () => {
  const theme = useTheme();
  const router = useInternalRouter();
  useSetNavigation({
    top: {
      title: undefined,
      right: <Exit />,
      marginBottom: 56
    },
    bottom: true
  });
  const { data } = useFetchUserInfo();

  const { props: name } = useInput({ initialValue: data.name });

  return (
    <SafeArea>
      <section
        css={css`
          ${flex({ direction: "column", align: "center" })}
          ${padding({ left: 25, right: 28 })}
        `}
      >
        <button
          type="button"
          css={css`
            ${flex({ direction: "column", align: "center" })}
            ${gutter({ direction: "vertical", space: 9 })}
            ${touchable}
          `}
        >
          <Image src={avatar} alt="dummy" width={88} height={88} />
          <OrangePlus />
        </button>
        <Spacing size={22} />
        <Stack.Vertical
          css={css`
            ${size({ width: 340 })}
          `}
        >
          <ComponentWithLabel label="User name" gutter={9}>
            <Flex
              css={css`
                ${width100}
              `}
            >
              <Spacing size={3} direction="horizontal" />
              <Input
                height={39}
                {...name}
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
              />
            </Flex>
          </ComponentWithLabel>
          <Spacing size={50} direction="horizontal" />
          <ComponentWithLabel label="Nationality" gutter={9}>
            <Flex
              css={css`
                ${width100}
              `}
            >
              <Spacing size={3} direction="horizontal" />
              <Input
                height={39}
                readOnly
                onClick={() => router.push("/profile/edit/nationality")}
                css={css`
                  ${touchable}
                `}
              />
            </Flex>
          </ComponentWithLabel>
          <ComponentWithLabel label="Eating habit" gutter={9}>
            <Flex
              css={css`
                ${width100}
              `}
            >
              <Spacing size={3} direction="horizontal" />
              <Input
                height={39}
                readOnly
                onClick={() => router.push("/profile/edit/eatingHabits")}
                css={css`
                  ${touchable}
                `}
              />
            </Flex>
          </ComponentWithLabel>
        </Stack.Vertical>
      </section>
    </SafeArea>
  );
};

export default ProfileEdit;

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
