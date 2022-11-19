import { css, useTheme } from "@emotion/react";
import { logo } from "@images/common";
import {
  Flex,
  flex,
  height100,
  SafeArea,
  Spacing,
  width100
} from "@toss/emotion-utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { FilledButton } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
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
    <SafeArea>
      <section
        css={css`
          ${flex({ direction: "column", align: "center" })}
          ${width100}
        ${height100}
        background-color: ${theme.colors.primary};
        `}
      >
        <Spacing size={170} />
        <Image src={logo} alt="TOPPINGS" css={css``} />
        <Spacing size={242} />
        <Flex>
          <Text
            _fontSize={25}
            _color={theme.colors.white}
            weight={theme.weighs.medium}
          >
            Do you want to
          </Text>
          <Spacing direction="horizontal" size={6} />
          <Text
            _fontSize={25}
            _color={theme.colors.white}
            weight={theme.weighs.extraBold}
          >
            JOIN
          </Text>
        </Flex>
        <Spacing size={35} />
        <motion.div whileTap={{ scale: 0.9 }}>
          <FilledButton width={106} height={33} onClick={onLoginHandler}>
            <Text
              _fontSize={15}
              _color={theme.colors.secondary["73"]}
              weight={theme.weighs.medium}
            >
              Click me!
            </Text>
          </FilledButton>
        </motion.div>
      </section>
    </SafeArea>
  );
};

export default Onboarding;
