import {
  useCurrentLocationSetter,
  useCurrentSelectCategorySetter
} from "@atoms/index";
import { css } from "@emotion/react";
import { padding } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { RestaurantCard, SearchInput } from "~/components/Common";
import { SearchLayout } from "~/components/Layout";
import { TagFamily } from "~/components/Recent";
import { useDebounce, useInput, useSetNavigation } from "~/hooks";
import {
  useFetchRestaurantNameByFiltering,
  useUploadRecentHistory
} from "~/server/recent";
import { pick } from "~/utils";

const RecentPage = () => {
  const { push } = useRouter();
  const [restaurantList, setRestaurantList] =
    useState<Restaurant.SearchByCountryDTO[]>();
  const setCurrentLocation = useCurrentLocationSetter();
  const setCurrentSelectCategory = useCurrentSelectCategorySetter();
  const { mutate: uploadRecentHistoryMutate } = useUploadRecentHistory();
  const { mutate: fetchRestaurantNameByFilteringMutate } =
    useFetchRestaurantNameByFiltering({
      onSuccess: data => {
        setRestaurantList(data);
      }
    });

  useSetNavigation({
    top: {
      marginBottom: 37
    }
  });

  const { props: keyword, setValue } = useInput({
    useDebounce: true,
    debounceTimeout: 300
  });

  const fetchRestaurantNameByFilteringMutateDebounce = useDebounce(
    (value: string) => fetchRestaurantNameByFilteringMutate(value),
    300
  );

  return (
    <>
      <SearchLayout>
        <SearchInput
          onSubmit={() => {
            fetchRestaurantNameByFilteringMutate(keyword.value);
          }}
          placeholder="enter the restaurant name"
          setValue={setValue}
          value={keyword.value}
          onChange={e => {
            if (!e.target.value.length) setRestaurantList(undefined);

            keyword.onChange(e);

            fetchRestaurantNameByFilteringMutateDebounce(e.target.value);
          }}
        />
      </SearchLayout>
      <TagFamily />

      {/* border는 임시로 넣어놨음 */}
      <div
        css={css`
          width: 100%;
          ${padding({
            x: 28
          })}
        `}
      >
        {restaurantList?.map(item => (
          <RestaurantCard
            key={item.id}
            onClick={() => {
              setCurrentLocation({
                latitude: item.latitude,
                longitude: item.longitude
              });
              uploadRecentHistoryMutate({
                type: "Filter",
                keyword: item.name,
                category: "Name",
                content: item.address,
                restaurantId: item.id
              });
              setCurrentSelectCategory(item.name);

              push("/map");
            }}
            item={{
              ...pick({ ...item }, [
                "id",
                "thumbnail",
                "type",
                "writer",
                "name",
                "address",
                "like",
                "likeCount"
              ])
            }}
          />
        ))}
      </div>
    </>
  );
};

export default RecentPage;
