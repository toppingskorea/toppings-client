import { css, useTheme } from "@emotion/react";
import { Flex, gutter, padding, SafeArea } from "@toss/emotion-utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { HeartWithNumber, SearchInput } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { SearchLayout } from "~/components/Layout";
import { TagFamily } from "~/components/Recent";
import { useInput, useSetNavigation } from "~/hooks";
import {
  useFetchRestaurantNameByFiltering,
  useUploadRecentHistory
} from "~/mutations/recent";
import {
  useCurrentLocationSetter,
  useCurrentSelectCategorySetter
} from "~/recoil/atoms";
import weighs from "~/styles/emotionTheme/weighs";

const RecentPage = () => {
  const { colors } = useTheme();
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

  const { props: keyword, setValue } = useInput({});

  return (
    <SafeArea>
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
          <Flex
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
            key={item.id}
            justify="space-between"
            css={css`
              width: 100%;
              border-bottom: 1px solid ${colors.secondary.DF};
              padding-bottom: 10px;
            `}
          >
            <Flex
              css={css`
                gap: 13px;
              `}
            >
              <Image
                src={item.thumbnail}
                width={80}
                height={80}
                alt=""
                css={css`
                  border: 1px solid black;
                  border-radius: 7px;
                `}
              />

              <Flex justify="space-between" direction="column">
                <div
                  css={css`
                    ${gutter("vertical", 6)}
                  `}
                >
                  <Text _fontSize={13} _color={colors.secondary[52]}>
                    {item.type}
                  </Text>
                  <Flex
                    align="center"
                    css={css`
                      gap: 6px;
                    `}
                  >
                    <Text
                      _fontSize={16}
                      _color={colors.secondary["4B"]}
                      weight={weighs.semiBold}
                    >
                      {item.name}
                    </Text>
                    <Text _fontSize={10} _color={colors.secondary["4B"]}>
                      by {item.writer}
                    </Text>
                  </Flex>
                </div>
                <Text _fontSize={10} _color={colors.secondary["46"]}>
                  {item.address}
                </Text>
              </Flex>
            </Flex>

            <Flex
              align="flex-end"
              css={css`
                gap: 6px;
              `}
            >
              <HeartWithNumber like={item.like} likeCount={item.likeCount} />
            </Flex>
          </Flex>
        ))}
      </div>
    </SafeArea>
  );
};

export default RecentPage;
