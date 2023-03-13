import { css, useTheme } from "@emotion/react";
import { useInput } from "@toppings/hooks";
import { padding, position, width100 } from "@toss/emotion-utils";
import { SearchInput } from "~/components/Common";
import { SearchNationality } from "~/components/Section";
import { OpenGraph } from "~/components/Util";
import { useDeviceInfo } from "~/contexts";
import { useBlurController } from "~/hooks";
import {
  useCountryClick,
  useSetNavigation
} from "./RegisterNationalityPage.hooks";

const RegisterNationalityPage = () => {
  const { isIos } = useDeviceInfo();
  const { colors, dimensions } = useTheme();
  const { focusController, isFocused } = useBlurController();
  const isIosFocused = isIos && isFocused;
  useSetNavigation(isIosFocused);

  const { onCountryClickHandler } = useCountryClick();

  const { props: keyword, setValue } = useInput({});

  return (
    <>
      <OpenGraph title="Register Nationality" />
      <SearchNationality
        keyword={keyword.value}
        onCountryClick={onCountryClickHandler}
        isFixedPosition={isIosFocused}
      />

      <div
        css={css`
          ${padding({ x: 16, y: 22 })};
          ${position("fixed", { bottom: 0 })}
          background-color: ${colors.white};
          max-width: ${dimensions.viewWidth - 32}px;
          ${width100}
        `}
      >
        <SearchInput
          placeholder="Search for a nationality"
          setValue={setValue}
          {...keyword}
          {...focusController}
        />
      </div>
    </>
  );
};

export default RegisterNationalityPage;
