import { css, useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { padding, position, SafeArea, width100 } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { RoundedTag, SearchInput } from "~/components/Common";
import { SearchNationality } from "~/components/Section";
import { useInput, useSetNavigation } from "~/hooks";
import {
  useFetchRestaurantByCountry,
  useUploadRecentHistory
} from "~/mutations/recent";
import { useMapSearchByCountrySetter, useRegisterState } from "~/recoil/atoms";
import tags from "./recent.constants";

const RecentPage = () => {
  const { colors, dimensions } = useTheme();
  const { push, pathname } = useRouter();
  const [register, setRegister] = useRegisterState();
  const setMapSearchByCountry = useMapSearchByCountrySetter();
  const { mutate: uploadRecentHistoryMutate } = useUploadRecentHistory();
  const { mutate: fetchRestaurantByCountryMutate } =
    useFetchRestaurantByCountry({
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
          uploadRecentHistoryMutate({
            type: "Filter",
            keyword: name,
            category: "Country"
          });
          fetchRestaurantByCountryMutate(name);
        }}
      />

      <div
        css={css`
          ${position("fixed", {
            bottom: dimensions.bottomNavigationHeight
          })}
          backdrop-filter: blur(10px);
        `}
      >
        <div
          css={css`
            width: 100vw;
            overflow-x: scroll;
            &::-webkit-scrollbar {
              display: none;
            }
            scrollbar-width: none;
          `}
        >
          <ul
            css={css`
              display: flex;
              gap: 20px;
              white-space: nowrap;
            `}
          >
            {tags.map(({ id, name }) => (
              <RoundedTag
                key={id}
                isTouchable
                padding={{
                  x: 16,
                  y: 7
                }}
                _fontSize={17}
                defaultProps={{
                  bgcolor: pathname.includes(id)
                    ? colors.primary
                    : colors.white,
                  bordercolor: colors.secondary.D9,
                  _color: pathname.includes(id) ? colors.white : colors.black
                }}
                onClick={() => push(`/recent/${id}`)}
              >
                {name}
              </RoundedTag>
            ))}
          </ul>
        </div>
      </div>

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
