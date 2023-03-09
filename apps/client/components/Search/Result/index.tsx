/* eslint-disable no-console */
import { css, useTheme } from "@emotion/react";
import { neverChecker } from "@toppings/utils";
import { flex, Flex, padding, Spacing, touchable } from "@toss/emotion-utils";
import { useCallback, useEffect, useState } from "react";
import { Text } from "~/components/Common/Typo";
import { useInternalRouter } from "~/hooks";
import { usePostSearchRestaurantStore } from "~/stores/post";
import { queryChunk } from "~/utils";
import type { SearchType } from "../SearchPage";

interface Props {
  value: string;
  type: SearchType;
}

const Result = ({ value, type }: Props) => {
  const { colors, weighs } = useTheme();
  const { push } = useInternalRouter();
  const dispatchAllPostSearchRestaurantState = usePostSearchRestaurantStore(
    state => state.dispatchAll
  );
  const [result, setResult] = useState<kakao.maps.services.PlacesSearchResult>(
    []
  );

  useEffect(() => {
    const ps = new kakao.maps.services.Places();

    if (value)
      ps.keywordSearch(
        value,
        (data, status) => {
          switch (status) {
            case kakao.maps.services.Status.OK:
              console.log("성공");
              setResult(data);
              break;
            case kakao.maps.services.Status.ZERO_RESULT:
              console.log("검색 결과가 없습니다.");
              break;
            case kakao.maps.services.Status.ERROR:
            case null:
              console.error("오류발생");
              break;
            default:
              neverChecker(status);
          }
        },
        {
          category_group_code:
            type === "restaurant" ? ["FD6", "CE7"] : undefined,
          // TODO: recoil value 및 사용자 주소로 대체
          x: 37.566826,
          y: 126.9786567
        }
      );
  }, [type, value]);

  const renderQueriedText = useCallback(
    (name: string) => {
      const chunk = queryChunk(name, value);

      if (Array.isArray(chunk)) {
        const [left, _keyword, right] = chunk;

        return (
          <>
            {left}
            <Text _fontSize={16} weight={weighs.bold}>
              {_keyword}
            </Text>
            {right}
          </>
        );
      }

      return chunk;
    },
    [weighs.bold, value]
  );

  const onItemClickHandler = useCallback(
    (item: kakao.maps.services.PlacesSearchResultItem) => {
      dispatchAllPostSearchRestaurantState({
        address_name: item.address_name,
        category_group_name: item.category_group_name,
        id: item.id,
        place_name: item.place_name,
        road_address_name: item.road_address_name,
        x: item.x,
        y: item.y
      });
    },
    [dispatchAllPostSearchRestaurantState]
  );

  return (
    <ul>
      {result.map(item => (
        <li
          key={item.id}
          css={css`
            ${padding({ x: 8, y: 10 })}
            border-bottom: 1px solid ${colors.secondary.D9};
            ${touchable}
          `}
        >
          <button
            type="button"
            css={css`
              ${flex({ direction: "column" })}
            `}
            onClick={() => {
              onItemClickHandler(item);
              push("/post/add");
            }}
          >
            <Text _fontSize={12} _color={colors.secondary[52]}>
              {item.category_group_name}
            </Text>
            <Spacing size={6} />
            <Flex align="center">
              <Text _fontSize={16} _color={colors.secondary[34]}>
                {renderQueriedText(item.place_name)}
              </Text>
              <Spacing size={12} direction="horizontal" />
              <Text _fontSize={10} _color={colors.secondary[47]}>
                {item.road_address_name}
              </Text>
            </Flex>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Result;
