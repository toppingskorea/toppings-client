import { useTheme } from "@emotion/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect, useState } from "react";
import { Text } from "~/components/Common/Typo";
import { useInput, useInternalRouter } from "~/hooks";
import { useRestaurantSetter } from "~/recoil/atoms/search";
import { neverChecker } from "~/utils";

type SearchType = "restaurant" | "local";

const Search = ({
  type
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useInternalRouter();
  const theme = useTheme();

  const { props: keyword, debouncedValue } = useInput({
    initialValue: " ",
    useDebounce: true,
    debounceTimeout: 300
  });

  const setRestaurant = useRestaurantSetter();

  const [data, setData] = useState<kakao.maps.services.PlacesSearchResult>([]);

  useEffect(() => {
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(
      debouncedValue,
      (data, status) => {
        switch (status) {
          case kakao.maps.services.Status.OK:
            console.log("성공");
            setData(data);
            break;
          case kakao.maps.services.Status.ZERO_RESULT:
            console.log("검색 결과가 없습니다.");
            break;
          case kakao.maps.services.Status.ERROR:
          case null:
            console.log("오류발생");
            break;
          default:
            neverChecker(status);
        }
      },
      {
        category_group_code: type === "restaurant" ? ["FD6", "CE7"] : undefined,
        // TODO: recoil value 및 사용자 주소로 대체
        x: 37.566826,
        y: 126.9786567
      }
    );
  }, [debouncedValue, type]);

  return (
    <div>
      <input {...keyword} />
      <div>
        {data.map(item => (
          <button
            type="button"
            onClick={() => {
              setRestaurant({
                address_name: item.address_name,
                category_group_name: item.category_group_name,
                id: item.id,
                place_name: item.place_name,
                road_address_name: item.road_address_name,
                x: item.x,
                y: item.y
              });
              router.back();
            }}
          >
            <Text _fontSize={16} _color={theme.colors.kakaoYellow}>
              {item.place_name}
            </Text>
            <Text _fontSize={16} _color={theme.colors.black}>
              {item.address_name}
            </Text>
            <Text _fontSize={16} _color={theme.colors.black}>
              {item.road_address_name}
            </Text>
          </button>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  type: SearchType;
}> = async context => ({
  props: {
    type: context.query.type as SearchType
  }
});

export default Search;
