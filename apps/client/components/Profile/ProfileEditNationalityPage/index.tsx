import { useEditState } from "@atoms/edit";
import { css, useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { padding, position, width100 } from "@toss/emotion-utils";
import { SearchInput } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { SearchNationality } from "~/components/Section";
import { OpenGraph } from "~/components/Util";
import {
  useInput,
  useInternalRouter,
  useScrollToTopByKeywordChange,
  useSetNavigation
} from "~/hooks";

const ProfileEditNationalityPage = () => {
  const { push, back } = useInternalRouter();
  const { colors, weighs, dimensions } = useTheme();
  const [edit, setEdit] = useEditState();

  useSetNavigation({
    top: {
      marginBottom: 35,
      title: (
        <Text _fontSize={23} weight={weighs.bold}>
          Select a Nationality
        </Text>
      ),
      right: {
        element: <Exit />,
        onClick: () => push("/map")
      }
    }
  });

  const { props: keyword, setValue } = useInput({});

  useScrollToTopByKeywordChange(keyword.value);

  return (
    <section>
      <SearchNationality
        keyword={keyword.value}
        onCountryClick={name => {
          setEdit({ ...edit, country: name });
          back();
        }}
      />

      <OpenGraph title="Edit Nationality" />

      <div
        css={css`
          ${padding({ x: 17, y: 22 })};
          ${position("fixed", {
            bottom: 0
          })}
          background-color: ${colors.white};
          max-width: ${dimensions.viewWidth - 32}px;
          ${width100}
        `}
      >
        <SearchInput
          placeholder="Search for a nationality"
          setValue={setValue}
          {...keyword}
        />
      </div>
    </section>
  );
};

export default ProfileEditNationalityPage;
