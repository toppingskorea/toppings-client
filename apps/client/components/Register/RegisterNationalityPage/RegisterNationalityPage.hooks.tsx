import { useTheme } from "@emotion/react";
import { Text } from "~/components/Common";
import {
  useInternalRouter,
  useSetNavigation as useSetNavigationHook
} from "~/hooks";
import { useRegisterInfoStore } from "~/stores/register";

export const useSetNavigation = (isIosFocused: boolean) => {
  const { colors, weighs } = useTheme();

  useSetNavigationHook({
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
};

export const useCountryClick = () => {
  const { push } = useInternalRouter();
  const dispatchCountry = useRegisterInfoStore(state => state.dispatchCountry);

  const onCountryClickHandler = (name: string) => {
    dispatchCountry(name);
    push("/register/eatingHabits");
  };

  return {
    onCountryClickHandler
  };
};
