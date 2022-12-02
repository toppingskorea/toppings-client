import { useRegisterState } from "@atoms/index";
import { css, useTheme } from "@emotion/react";
import { padding, position, SafeArea, width100 } from "@toss/emotion-utils";
import { SearchInput } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { SearchNationality } from "~/components/Section";
import { useInput, useInternalRouter, useSetNavigation } from "~/hooks";

const RegisterNationality = () => {
  const { push } = useInternalRouter();
  const theme = useTheme();
  const [register, setRegister] = useRegisterState();

  useSetNavigation({
    top: {
      marginBottom: 35,
      title: (
        <Text _fontSize={23} weight={theme.weighs.bold}>
          Select a Nationality
        </Text>
      )
    }
  });

  const { props: keyword, setValue } = useInput({});

  return (
    <SafeArea>
      <SearchNationality
        keyword={keyword.value}
        onCountryClick={name => {
          setRegister({ ...register, country: name });
          push("/register/eatingHabits");
        }}
      />

      <div
        css={css`
          ${padding({ x: 16, y: 22 })};
          ${position("fixed", { bottom: 0 })}
          background-color: ${theme.colors.white};
          max-width: ${theme.dimensions.viewWidth - 32}px;
          ${width100}
        `}
      >
        <SearchInput
          onSubmit={() => console.log("sad")}
          placeholder="Search for a nationality"
          setValue={setValue}
          {...keyword}
        />
      </div>
    </SafeArea>
  );
};

export default RegisterNationality;
