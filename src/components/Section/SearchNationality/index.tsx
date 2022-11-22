import { css, useTheme } from "@emotion/react";
import { Flex, flex, gutter, padding, Spacing } from "@toss/emotion-utils";
import { Fragment, useMemo } from "react";
import { countries } from "~/constants/data/common";
import { objectEntries, objectKeys, objectValues } from "~/utils";
import { OrangeTypo, Text } from "../../Common/Typo";

interface Props {
  keyword: string;
  onCountryClick: (name: string) => void;
}

const SearchNationality = ({ keyword, onCountryClick }: Props) => {
  const theme = useTheme();
  const filteredCountries = useMemo(() => {
    const obj: Partial<typeof countries> = {};

    const array = objectValues(countries).map(values => {
      return values.filter(value =>
        value.name.toLowerCase().includes(keyword.toLowerCase())
      );
    });

    objectKeys(countries).forEach((key, index) => {
      obj[key] = array[index];
    });

    return obj;
  }, [keyword]);

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
                <OrangeTypo>{key}</OrangeTypo>
                <Spacing size={10} />
                <Flex
                  direction="column"
                  css={css`
                    ${gutter({ space: 15, direction: "vertical" })}
                  `}
                  as="ul"
                >
                  {value.map(country => (
                    <Text
                      _fontSize={16}
                      _color={theme.colors.secondary[62]}
                      lineHeight={22}
                      key={country.code}
                      onClick={() => {
                        onCountryClick(country.name);
                      }}
                    >
                      {boldQuery(country.name, keyword)}
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
  );
};

export default SearchNationality;
