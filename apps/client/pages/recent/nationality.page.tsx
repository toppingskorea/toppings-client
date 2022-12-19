import { useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { SafeArea } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { SearchInput } from "~/components/Common";
import { SearchLayout } from "~/components/Layout";
import { TagFamily } from "~/components/Recent";
import { SearchNationality } from "~/components/Section";
import { useInput, useSetNavigation } from "~/hooks";
import {
  useFetchRestaurantByCountry,
  useUploadRecentHistory
} from "~/mutations/recent";
import { useMapSearchByCountrySetter, useRegisterState } from "~/recoil/atoms";

const RecentPage = () => {
  const { colors, dimensions } = useTheme();
  const { push } = useRouter();
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
      marginBottom: 37,
      right: <Exit />
    }
  });

  const { props: keyword, setValue } = useInput({});

  return (
    <SafeArea>
      <SearchLayout>
        <SearchInput
          placeholder="Enter nationality name"
          setValue={setValue}
          {...keyword}
        />
      </SearchLayout>
      <TagFamily isBlur />
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
    </SafeArea>
  );
};

export default RecentPage;
