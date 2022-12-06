import { css, useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { padding, position, SafeArea, width100 } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { RoundedTag, SearchInput } from "~/components/Common";
import { SearchNationality } from "~/components/Section";
import { useInput, useSetNavigation } from "~/hooks";
import { useUploadRecentHistory } from "~/mutations/recent";
import useFetchRestaurantByCountry from "~/mutations/recent/useFetchRestaurantByCountry";
import { useMapSearchByCountrySetter, useRegisterState } from "~/recoil/atoms";
import tags from "./recent.constants";

const RecentPage = () => {
  const theme = useTheme();
  const { push, pathname } = useRouter();
  const [register, setRegister] = useRegisterState();
  const setMapSearchByCountry = useMapSearchByCountrySetter();
  const { mutate: recentHistoryMutate } = useUploadRecentHistory();
  const { mutate } = useFetchRestaurantByCountry({
    onSuccess: data => {
      setMapSearchByCountry(data);

      push("/map");
    }
  });

  useSetNavigation({
    top: {
      marginBottom: 85,
      right: <Exit />
    }
  });

  const { props: keyword, setValue } = useInput({});

  return (
    <SafeArea>
      <SearchNationality
        keyword={keyword.value}
        onCountryClick={name => {
          setRegister({ ...register, country: name });
          recentHistoryMutate({
            type: "Filter",
            keyword: name,
            category: "Country"
          });
          mutate(name);
        }}
      />

      <div
        css={css`
          ${position("fixed", {
            bottom: theme.dimensions.bottomNavigationHeight
          })}
        `}
      >
        <ul
          css={css`
            display: flex;
            gap: 20px;
            white-space: nowrap;
            overflow-x: auto;
          `}
        >
          {tags.map(({ ID, NAME }) => (
            <RoundedTag
              key={ID}
              padding={{
                x: 16,
                y: 7
              }}
              _fontSize={17}
              defaultProps={{
                bgcolor: pathname.includes(ID)
                  ? theme.colors.primary
                  : theme.colors.white,
                bordercolor: theme.colors.secondary.D9
              }}
              onClick={() => push(`/recent/${ID}`)}
            >
              {NAME}
            </RoundedTag>
          ))}
        </ul>
      </div>

      <div
        css={css`
          ${padding({ x: 16, y: 22 })};
          ${position("fixed", { bottom: 0 })}
          background-color: ${theme.colors.white};
          max-width: ${theme.dimensions.viewWidth - 32}px;
          ${width100}
        `}
      >
        <SearchInput
          onSubmit={() => 1}
          placeholder="Enter nationality name"
          setValue={setValue}
          {...keyword}
        />
      </div>
    </SafeArea>
  );
};

export default RecentPage;
