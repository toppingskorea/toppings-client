import { useEditState } from "@atoms/edit";
import { css, useTheme } from "@emotion/react";
import { useInput } from "@toppings/hooks";
import { padding, position, width100 } from "@toss/emotion-utils";
import { SearchInput } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { SearchNationality } from "~/components/Section";
import { OpenGraph } from "~/components/Util";
import { useDeviceInfo } from "~/contexts";
import {
  useBlurController,
  useInternalRouter,
  useScrollToTopByKeywordChange,
  useSetNavigation
} from "~/hooks";

const ProfileEditNationalityPage = () => {
  const { back } = useInternalRouter();
  const { isIos } = useDeviceInfo();
  const { colors, weighs, dimensions } = useTheme();
  const [edit, setEdit] = useEditState();

  const { isFocused } = useBlurController();

  const isIosFocused = isIos && isFocused;

  useSetNavigation({
    top: isIosFocused
      ? undefined
      : {
          marginBottom: 35,
          title: (
            <Text
              _fontSize={19}
              weight={weighs.bold}
              _color={colors.secondary[47]}
            >
              Select a Nationality
            </Text>
          )
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
        isFixedPosition={isIosFocused}
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
