import { useTheme } from "@emotion/react";
import { Flex, Stack } from "@toss/emotion-utils";
import Link from "next/link";
import { Text } from "~/components/Common/Typo";
import { useTokenCookie } from "~/hooks";

const Index = () => {
  const theme = useTheme();
  const tokenCookie = useTokenCookie();

  const logoutHandler = () => {
    tokenCookie.remove();
  };

  return (
    <Stack.Vertical gutter={32}>
      <button type="button" onClick={logoutHandler}>
        <Text _fontSize={36} _color={theme.colors.kakaoYellow}>
          로그아웃하기
        </Text>
      </button>
      <Link href="/login" passHref>
        <Text _fontSize={36} _color={theme.colors.kakaoYellow}>
          로그인하러가기
        </Text>
      </Link>

      <Text _fontSize={36} _color={theme.colors.white}>
        I&apos;m toppings
      </Text>
      <Text _fontSize={24} _color={theme.colors.white}>
        I&apos;m toppings
      </Text>
      <Text _fontSize={18} _color={theme.colors.white}>
        I&apos;m toppings
      </Text>
      <Stack.Horizontal align="center">
        <Text _fontSize={36} _color={theme.colors.white}>
          I&apos;m toppings
        </Text>
        <Text _fontSize={24} _color={theme.colors.white}>
          I&apos;m toppings
        </Text>
        <Text _fontSize={18} _color={theme.colors.white}>
          I&apos;m toppings
        </Text>
      </Stack.Horizontal>
      <Flex.Center direction="column">
        <Text _fontSize={36} _color={theme.colors.white}>
          I&apos;m toppings
        </Text>
        <Text _fontSize={24} _color={theme.colors.white}>
          I&apos;m toppings
        </Text>
        <Text _fontSize={18} _color={theme.colors.white}>
          I&apos;m toppings
        </Text>
      </Flex.Center>
      <Stack.Vertical gutter={500}>
        <Text _fontSize={36} _color={theme.colors.white}>
          I&apos;m toppings
        </Text>
        <Text _fontSize={24} _color={theme.colors.white}>
          I&apos;m toppings
        </Text>
        <Text _fontSize={18} _color={theme.colors.white}>
          I&apos;m toppings
        </Text>
      </Stack.Vertical>
    </Stack.Vertical>
  );
};

export default Index;
