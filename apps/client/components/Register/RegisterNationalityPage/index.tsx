import { useRegisterState } from "@atoms/index";
import { css, useTheme } from "@emotion/react";
import { useInput } from "@toppings/hooks";
import { padding, position, width100 } from "@toss/emotion-utils";
import { SearchInput } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { SearchNationality } from "~/components/Section";
import { OpenGraph } from "~/components/Util";
import { useDeviceInfo } from "~/contexts";
import {
  useBlurController,
  useInternalRouter,
  useSetNavigation
} from "~/hooks";

const RegisterNationalityPage = () => {
  const { push } = useInternalRouter();
  const { isIos } = useDeviceInfo();
  const { colors, weighs, dimensions } = useTheme();
  const [register, setRegister] = useRegisterState();

  const { focusController, isFocused } = useBlurController();

  const isIosFocused = isIos && isFocused;

  useSetNavigation({
    top: isIosFocused
      ? undefined
      : {
          marginBottom: 35,
          title: (
            <Text
              _fontSize={19}
              weight={weighs.bold}
              _color={colors.secondary[47]}
            >
              Select a Nationality
            </Text>
          ),
          hideBackButton: true
        }
  });

  const { props: keyword, setValue } = useInput({});

  return (
    <>
      <OpenGraph title="Register Nationality" />
      <SearchNationality
        keyword={keyword.value}
        onCountryClick={name => {
          setRegister({ ...register, country: name });
          push("/register/eatingHabits");
        }}
        isFixedPosition={isIosFocused}
      />

      <div
        css={css`
          ${padding({ x: 16, y: 22 })};
          ${position("fixed", { bottom: 0 })}
          background-color: ${colors.white};
          max-width: ${dimensions.viewWidth - 32}px;
          ${width100}
        `}
      >
        <SearchInput
          placeholder="Search for a nationality"
          setValue={setValue}
          {...keyword}
          {...focusController}
        />
      </div>
    </>
  );
};

export default RegisterNationalityPage;
