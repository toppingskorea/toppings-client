import { useTheme } from "@emotion/react";
import { FilledButton } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { OrangeSection } from "~/components/Section";
import { OpenGraph } from "~/components/Util";
import { useLoginClick } from "./OnboardingPage.hooks";
import { DescriptionContainer } from "./OnboardingPage.styles";

const Onboarding = () => {
  const { colors, weighs } = useTheme();

  const { onLoginHandler } = useLoginClick();

  return (
    <>
      <OpenGraph title="onboarding" />
      <OrangeSection
        description={
          <DescriptionContainer>
            <Text _fontSize={21} _color={colors.white} weight={weighs.medium}>
              Do you want to
            </Text>
            <Text
              _fontSize={21}
              _color={colors.white}
              weight={weighs.extraBold}
            >
              JOIN
            </Text>
          </DescriptionContainer>
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
