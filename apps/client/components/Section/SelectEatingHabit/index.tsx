import { css } from "@emotion/react";
import { Flex, flex, gutter, padding, Spacing } from "@toss/emotion-utils";
import { PrimaryTag } from "~/components/Common";
import { OrangeTypo } from "~/components/Common/Typo";
import { diets, religions } from "~/constants/data/common";
import habitTitleList from "~/constants/data/common/habitTitleList";

interface Props {
  onClick: (title: Common.EatingHabit, content: string) => void;
  habits?: Pick<Profile.UserDTO, "habits">["habits"];
}

const SelectEatingHabit = ({ onClick, habits }: Props) => {
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
              row-gap: 6px;
            `}
          >
            {(habit === "Diet" ? diets : religions).map(content => (
              <PrimaryTag
                key={content}
                selected={!!habits?.find(habit => habit.content === content)}
                onClick={() => {
                  onClick(habit, content);
                }}
              >
                {content}
              </PrimaryTag>
            ))}
          </ul>
        </Flex>
      ))}
    </section>
  );
};

export default SelectEatingHabit;
