import { css, useTheme } from "@emotion/react";
import { Flex, gutter } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { FilledButton } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { OrangeSection } from "~/components/Section";
import { env } from "~/constants";
import { useSetNavigation } from "~/hooks";

const Onboarding = () => {
  useSetNavigation();
  const theme = useTheme();
  const router = useRouter();

  const kakaoUrl = `${env.TOPPINGS_SERVER_URL}/oauth2/authorization/kakao?redirect_uri=${env.REDIRECT_URI}`;

  const onLoginHandler = () => {
    router.replace(kakaoUrl);
  };

  return (
    <OrangeSection
      description={
        <Flex
          css={css`
            ${gutter({ space: 6, direction: "horizontal" })}
          `}
        >
          <Text
            _fontSize={25}
            _color={theme.colors.white}
            weight={theme.weighs.medium}
          >
            Do you want to
          </Text>
          <Text
            _fontSize={25}
            _color={theme.colors.white}
            weight={theme.weighs.extraBold}
          >
            JOIN
          </Text>
        </Flex>
      }
      button={
        <FilledButton
          size={{
            width: 106,
            height: 33
          }}
          onClick={onLoginHandler}
        >
          <Text
            _fontSize={15}
            _color={theme.colors.secondary["73"]}
            weight={theme.weighs.medium}
          >
            Click me!
          </Text>
        </FilledButton>
      }
    />
  );
};

export default Onboarding;
