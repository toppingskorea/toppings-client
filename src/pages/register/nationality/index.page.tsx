import { css, useTheme } from "@emotion/react";
import { padding, position, SafeArea, width100 } from "@toss/emotion-utils";
import { SearchInput } from "~/components/Common";
import { Text } from "~/constants";
import countries from "~/constants/data/common/countries";
import { useInput, useSetNavigation } from "~/hooks";
import { objectEntries } from "~/utils";

const RegisterNationality = () => {
  const theme = useTheme();
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

  const { props, setValue } = useInput({});

  return (
    <SafeArea>
      <section>
        {objectEntries(countries).map(([key, value]) =>
          countries[key].map(country => (
            <Text _fontSize={16}>{country.name}</Text>
          ))
        )}
      </section>
      <div
        css={css`
          ${padding({ x: 16, y: 22 })};
          ${position("fixed", { bottom: 0 })}
          background-color: ${theme.colors.white};
          ${width100}
        `}
      >
        <SearchInput
          onSubmit={() => console.log("sad")}
          padding={padding({ left: 18 })}
          placeholder="Search for a nationality"
          setValue={setValue}
          {...props}
        />
      </div>
    </SafeArea>
  );
};

export default RegisterNationality;
