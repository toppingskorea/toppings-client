import { css, useTheme } from "@emotion/react";
import { Flex, padding, size, Stack } from "@toss/emotion-utils";
import Image from "next/image";
import { Text } from "~/components/Common/Typo";
import { useFetchLikePercent } from "~/queries/restaurant";
import { countryToSvg } from "~/utils/country";

interface Props {
  id: string;
}
const Likes = ({ id }: Props) => {
  const { colors } = useTheme();

  const { data } = useFetchLikePercent(+id);
  return (
    <Stack.Vertical
      css={css`
        ${padding({ x: 24 })}
      `}
    >
      <Flex justify="space-between">
        <Text _fontSize={13} _color={colors.secondary[47]}>
          Nationality
        </Text>

        <Stack.Vertical gutter={6}>
          {data.countryPercent.map(country => (
            <Stack.Horizontal gutter={10} align="center">
              <Image
                src={countryToSvg(country.country)}
                width={20}
                height={20}
                alt={`${country.country}'s country flag`}
              />

              <div
                css={css`
                  ${size({
                    width: 124,
                    height: 8
                  })}
                  border-radius: 100px;
                  background-color: ${colors.secondary.E2};
                `}
              >
                <div
                  css={css`
                    ${size({
                      width: `${country.percent}%`,
                      height: 8
                    })}
                    border-radius: 100px;
                    background-color: ${colors.secondary.FF};
                  `}
                />
              </div>

              <Text _fontSize={10} _color={colors.secondary[42]}>
                {country.percent}%({country.count})
              </Text>
            </Stack.Horizontal>
          ))}
        </Stack.Vertical>
      </Flex>
      <Flex justify="space-between">
        <Text _fontSize={13} _color={colors.secondary[47]}>
          Eating Habit
        </Text>

        <Stack.Vertical gutter={12} align="flex-end">
          {data.habitPercent.map(habit => (
            <Stack.Horizontal gutter={10} align="center">
              <Text _fontSize={10} _color={colors.secondary[42]}>
                {habit.habit}
              </Text>

              <div
                css={css`
                  ${size({
                    width: 124,
                    height: 8
                  })}
                  border-radius: 100px;
                  background-color: ${colors.secondary.E2};
                `}
              >
                <div
                  css={css`
                    ${size({
                      width: `${habit.percent}%`,
                      height: 8
                    })}
                    border-radius: 100px;
                    background-color: ${colors.secondary.FF};
                  `}
                />
              </div>

              <Text _fontSize={10} _color={colors.secondary[42]}>
                {habit.percent}%({habit.count})
              </Text>
            </Stack.Horizontal>
          ))}
        </Stack.Vertical>
      </Flex>
    </Stack.Vertical>
  );
};

export default Likes;
