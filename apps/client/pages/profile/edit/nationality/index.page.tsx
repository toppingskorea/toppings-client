import { useEditState } from "@atoms/edit";
import { css, useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { padding, position, SafeArea, width100 } from "@toss/emotion-utils";
import { SearchInput } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { SearchNationality } from "~/components/Section";
import { useInput, useInternalRouter, useSetNavigation } from "~/hooks";

const ProfileEditNationality = () => {
  const router = useInternalRouter();
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
      right: <Exit />
    },
    bottom: true
  });

  const { props: keyword, setValue } = useInput({});

  return (
    <SafeArea>
      <SearchNationality
        keyword={keyword.value}
        onCountryClick={name => {
          setEdit({ ...edit, country: name });
          router.back();
        }}
      />

      <div
        css={css`
          ${padding({ x: 16, y: 22 })};
          ${position("fixed", {
            bottom: dimensions.bottomNavigationHeight
          })}
          background-color: ${colors.white};
          max-width: ${dimensions.viewWidth - 32}px;
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

export default ProfileEditNationality;
