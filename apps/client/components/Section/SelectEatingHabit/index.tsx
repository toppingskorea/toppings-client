import { css, useTheme } from "@emotion/react";
import { Flex, flex, gutter, padding, Spacing } from "@toss/emotion-utils";
import { PrimaryTag } from "~/components/Common";
import { OrangeTypo, Text } from "~/components/Common/Typo";
import { diets, religions } from "~/constants/data/common";
import habitTitleList from "~/constants/data/common/habitTitleList";

interface Props {
  onClick: (title: Common.EatingHabit, content: string) => void;
  habits?: Pick<Profile.UserDTO, "habits">["habits"];
  isRecent?: true;
}

const SelectEatingHabit = ({ onClick, habits, isRecent }: Props) => {
  const { colors } = useTheme();

  return (
    <section
      css={css`
        ${flex({ direction: "column" })}
        ${padding({ x: 30 })}
      ${gutter({ direction: "vertical", space: 39 })}
      `}
    >
      {habitTitleList.map(habit => (
        <Flex direction="column" key={habit}>
          <OrangeTypo>{habit}</OrangeTypo>
          <Spacing size={13} />
          <ul
            css={css`
              display: flex;
              flex-wrap: wrap;
              column-gap: 2px;
              row-gap: ${isRecent ? 20 : 6}px;
              ${isRecent && "flex-direction: column; padding-left: 10px"}
            `}
          >
            {(habit === "Diet" ? diets : religions).map(content =>
              isRecent ? (
                <li key={content}>
                  <button
                    type="button"
                    onClick={() => {
                      onClick(habit, content);
                    }}
                  >
                    <Text _color={colors.secondary[69]} _fontSize={17}>
                      {content}
                    </Text>
                  </button>
                </li>
              ) : (
                <PrimaryTag
                  key={content}
                  selected={!!habits?.find(habit => habit.content === content)}
                  onClick={() => {
                    onClick(habit, content);
                  }}
                >
                  {content}
                </PrimaryTag>
              )
            )}
          </ul>
        </Flex>
      ))}
    </section>
  );
};

export default SelectEatingHabit;
