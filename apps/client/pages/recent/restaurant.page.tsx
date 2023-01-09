import {
  useCurrentLocationSetter,
  useCurrentSelectCategorySetter
} from "@atoms/index";
import { css } from "@emotion/react";
import { padding } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RestaurantCard, SearchInput } from "~/components/Common";
import { SearchLayout } from "~/components/Layout";
import { TagFamily } from "~/components/Recent";
import { useInput, useSetNavigation } from "~/hooks";
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

  const {
    props: keyword,
    debouncedValue,
    setValue
  } = useInput({
    useDebounce: true,
    debounceTimeout: 300
  });

  useEffect(() => {
    if (!debouncedValue.length) {
      setRestaurantList(undefined);
      return;
    }

    fetchRestaurantNameByFilteringMutate(debouncedValue);
  }, [debouncedValue, fetchRestaurantNameByFilteringMutate]);

  return (
    <>
      <SearchLayout>
        <SearchInput
          onSubmit={() => {
            fetchRestaurantNameByFilteringMutate(keyword.value);
          }}
          placeholder="enter the restaurant name"
          setValue={setValue}
          {...keyword}
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
