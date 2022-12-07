import { css, useTheme } from "@emotion/react";
import {
  flex,
  Flex,
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
import { useUploadRecentHistory } from "~/mutations/recent";
import useFetchRestaurantNameByFiltering from "~/mutations/recent/useFetchRestaurantNameByFiltering";
import weighs from "~/styles/emotionTheme/weighs";
import tags from "./recent.constants";

const RecentPage = () => {
  const { colors, dimensions } = useTheme();
  const { push, pathname } = useRouter();
  const [restaurantList, setRestaurantList] = useState<
    Restaurant.SearchByCountryDTO[] | null
  >(null);
  // 클릭한 카드의 값들이 들어가게(content, restaurantId)
  const { mutate: recentHistoryMutate } = useUploadRecentHistory();
  const { mutate } = useFetchRestaurantNameByFiltering({
    onSuccess: data => {
      console.log(data);
      setRestaurantList(data);
    }
  });

  useSetNavigation({
    top: {
      marginBottom: 85
    }
  });

  const { props: keyword, setValue } = useInput({});

  // TODO: 찬혁이 답장 오면 카드 만들지 정하기
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
            mutate(keyword.value);
          }}
          placeholder="enter the restaurant name"
          setValue={setValue}
          {...keyword}
        />
      </div>
      {/* border는 임시로 넣어놨음 */}
      <div
        css={css`
          width: 100%;
        `}
      >
        {restaurantList?.map(
          ({ thumbnail, name, id, type, writer, address, likeCount }) => (
            <Flex
              key={id}
              justify="space-between"
              css={css`
                width: 100%;
              `}
            >
              <Flex
                css={css`
                  gap: 13px;
                `}
              >
                <Image
                  src={thumbnail}
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
                  <div>
                    <Text _fontSize={13} _color={colors.secondary[52]}>
                      {type}
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
                        {name}
                      </Text>
                      <Text _fontSize={10} _color={colors.secondary["4B"]}>
                        {writer}
                      </Text>
                    </Flex>
                  </div>
                  <Text _fontSize={10} _color={colors.secondary["46"]}>
                    {address}
                  </Text>
                </Flex>
              </Flex>

              <Text
                _fontSize={12}
                _color={colors.secondary["4B"]}
                css={css`
                  ${flex({ align: "flex-end" })}
                `}
              >
                {likeCount}
              </Text>
            </Flex>
          )
        )}
      </div>
      <div
        css={css`
          ${position("fixed", {
            bottom: dimensions.bottomNavigationHeight
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
                bgcolor: pathname.includes(ID) ? colors.primary : colors.white,
                bordercolor: colors.secondary.D9
              }}
              onClick={() => push(`/recent/${ID}`)}
            >
              {NAME}
            </RoundedTag>
          ))}
        </ul>
      </div>
    </SafeArea>
  );
};

export default RecentPage;
