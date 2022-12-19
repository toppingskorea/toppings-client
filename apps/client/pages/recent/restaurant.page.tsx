import { css, useTheme } from "@emotion/react";
import { EmptyHeart, OrangeHeart } from "@svgs/common";
import {
  Flex,
  gutter,
  padding,
  position,
  SafeArea,
  width100
} from "@toss/emotion-utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { RoundedTag, SearchInput } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { useInput, useSetNavigation } from "~/hooks";
import {
  useFetchRestaurantNameByFiltering,
  useUploadRecentHistory
} from "~/mutations/recent";
import { useCurrentLocationSetter } from "~/recoil/atoms";
import weighs from "~/styles/emotionTheme/weighs";
import tags from "./recent.constants";

const RecentPage = () => {
  const { colors, dimensions } = useTheme();
  const { push, pathname } = useRouter();
  const [restaurantList, setRestaurantList] =
    useState<Restaurant.SearchByCountryDTO[]>();
  const setCurrentLocation = useCurrentLocationSetter();
  const { mutate: uploadRecentHistoryMutate } = useUploadRecentHistory();
  const { mutate: fetchRestaurantNameByFilteringMutate } =
    useFetchRestaurantNameByFiltering({
      onSuccess: data => {
        setRestaurantList(data);
      }
    });

  useSetNavigation({
    top: {
      marginBottom: 85
    }
  });

  const { props: keyword, setValue } = useInput({});

  return (
    <SafeArea>
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
          onSubmit={() => {
            fetchRestaurantNameByFilteringMutate(keyword.value);
          }}
          placeholder="enter the restaurant name"
          setValue={setValue}
          {...keyword}
        />
      </div>
      <div
        css={css`
          ${position("fixed", {
            bottom: dimensions.bottomNavigationHeight
          })}
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
      {/* border는 임시로 넣어놨음 */}
      <div
        css={css`
          width: 100%;
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

              <Flex
                justify="space-between"
                direction="column"
                css={css`
                  gap: 7px;
                `}
              >
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
              {item.like ? (
                <OrangeHeart width={13} height={12} />
              ) : (
                <EmptyHeart width={13} height={12} />
              )}
              <Text _fontSize={11.5} _color={colors.secondary["4B"]}>
                {item.likeCount}
              </Text>
            </Flex>
          </Flex>
        ))}
      </div>
    </SafeArea>
  );
};

export default RecentPage;