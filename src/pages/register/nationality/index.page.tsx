import { css, useTheme } from "@emotion/react";
import {
  flex,
  Flex,
  gutter,
  padding,
  position,
  SafeArea,
  Spacing,
  width100
} from "@toss/emotion-utils";
import { Fragment, useMemo } from "react";
import { SearchInput } from "~/components/Common";
import { Text } from "~/constants";
import countries from "~/constants/data/common/countries";
import { useInput, useSetNavigation } from "~/hooks";
import { objectEntries, objectKeys, objectValues } from "~/utils";

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

  const { props: keyword, setValue } = useInput({});

  const filteredCountries = useMemo(() => {
    const obj: Partial<typeof countries> = {};

    const array = objectValues(countries).map(values => {
      return values.filter(value =>
        value.name.toLowerCase().includes(keyword.value.toLowerCase())
      );
    });

    objectKeys(countries).forEach((key, index) => {
      obj[key] = array[index];
    });

    return obj;
  }, [keyword.value]);

  const boldQuery = (str: string, query: string) => {
    const n = str.toUpperCase();
    const q = query.toUpperCase();
    const x = n.indexOf(q);
    if (!q || x === -1) {
      return str; // bail early
    }
    const l = q.length;
    return (
      <>
        {str.substr(0, x)}
        <Text _fontSize={16} weight={theme.weighs.bold}>
          {str.substr(x, l)}
        </Text>
        {str.substr(x + l)}
      </>
    );
  };

  return (
    <SafeArea>
      <section
        css={css`
          ${flex({ direction: "row" })}
          ${padding({ x: 22 })}
        `}
      >
        <Flex direction="column">
          {objectEntries(filteredCountries).map(([key, value]) => (
            <Fragment key={key}>
              {value && value?.length > 0 && (
                <>
                  <Text
                    _fontSize={23}
                    _color={theme.colors.primary}
                    weight={theme.weighs.semiBold}
                  >
                    {key}
                  </Text>
                  <Spacing size={10} />
                  <Flex
                    direction="column"
                    css={css`
                      ${gutter({ space: 15, direction: "vertical" })}
                    `}
                  >
                    {value.map(country => (
                      <Text
                        _fontSize={16}
                        _color={theme.colors.secondary[62]}
                        lineHeight={22}
                        key={country.code}
                      >
                        {boldQuery(country.name, keyword.value)}
                      </Text>
                    ))}
                  </Flex>
                  <Spacing size={30} />
                </>
              )}
            </Fragment>
          ))}
        </Flex>
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
          {...keyword}
        />
      </div>
    </SafeArea>
  );
};

export default RegisterNationality;
