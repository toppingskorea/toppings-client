import { css, useTheme } from "@emotion/react";
import {
  Flex,
  flex,
  gutter,
  padding,
  Spacing,
  touchable
} from "@toss/emotion-utils";
import { Fragment, useCallback, useMemo } from "react";
import { countries } from "~/constants/data/common";
import { objectEntries, objectKeys, objectValues, queryChunk } from "~/utils";
import { OrangeTypo, Text } from "../../Common/Typo";

interface Props {
  keyword: string;
  onCountryClick: (name: string) => void;
}

const SearchNationality = ({ keyword, onCountryClick }: Props) => {
  const { colors, weighs } = useTheme();
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

  const renderQueriedText = useCallback(
    (name: string) => {
      const chunk = queryChunk(name, keyword);

      if (Array.isArray(chunk)) {
        const [left, _keyword, right] = chunk;
        return (
          <>
            {left}
            <Text _fontSize={16} weight={weighs.bold}>
              {_keyword}
            </Text>
            {right}
          </>
        );
      }

      return chunk;
    },
    [keyword, weighs.bold]
  );

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
                      _color={colors.secondary[62]}
                      lineHeight={22}
                      key={country.code}
                      onClick={() => {
                        onCountryClick(country.name);
                      }}
                      css={css`
                        ${touchable}
                      `}
                    >
                      {renderQueriedText(country.name)}
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
