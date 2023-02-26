import { css, useTheme } from "@emotion/react";
import { Flex, padding } from "@toss/emotion-utils";
import { FilledButton, Seek } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { useRegisterButtonClick } from "./RegisterButton.hooks";

const RegisterButton = () => {
  const { colors, weighs } = useTheme();

  const { onClickRegisterHandler, updateUserInfoIsLoading } =
    useRegisterButtonClick();

  return (
    <Flex
      justify="center"
      css={css`
        ${padding({ bottom: 5 })}
      `}
    >
      <FilledButton
        size={{
          width: 278,
          height: 37
        }}
        bgcolor={colors.primary}
        disabled={updateUserInfoIsLoading}
        onClick={onClickRegisterHandler}
      >
        {updateUserInfoIsLoading ? (
          <Seek />
        ) : (
          <Text _fontSize={17} _color={colors.white} weight={weighs.semiBold}>
            Register
          </Text>
        )}
      </FilledButton>
    </Flex>
  );
};

export default RegisterButton;
