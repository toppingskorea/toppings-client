import { css, useTheme } from "@emotion/react";
import { Flex, gutter } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { FilledButton } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { OrangeSection } from "~/components/Section";
import { OpenGraph } from "~/components/Util";
import { env } from "~/constants";

const Onboarding = () => {
  const { colors, weighs } = useTheme();
  const router = useRouter();

  const kakaoUrl = `${env.TOPPINGS_SERVER_URL}/oauth2/authorization/kakao?redirect_uri=${env.REDIRECT_URI}`;

  const onLoginHandler = () => {
    router.replace(kakaoUrl);
  };

  return (
    <>
      <OpenGraph title="onboarding" />
      <OrangeSection
        description={
          <Flex
            css={css`
              ${gutter({ space: 6, direction: "horizontal" })}
            `}
          >
            <Text _fontSize={25} _color={colors.white} weight={weighs.medium}>
              Do you want to
            </Text>
            <Text
              _fontSize={25}
              _color={colors.white}
              weight={weighs.extraBold}
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
              _color={colors.secondary["73"]}
              weight={weighs.medium}
            >
              Click me!
            </Text>
          </FilledButton>
        }
      />
    </>
  );
};

export default Onboarding;
