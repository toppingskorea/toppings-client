/* eslint-disable no-console */
import { useRestaurantSetter } from "@atoms/search";
import { Badge, Box, Input, VStack } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useInput } from "@toppings/hooks";
import { width100 } from "@toss/emotion-utils";
import { useCallback, useEffect, useState } from "react";
import { Text } from "~/components/Common";

const RestaurantSearchSection = () => {
  const { props: keyword, debouncedValue } = useInput({
    initialValue: "",
    useDebounce: true,
    debounceTimeout: 300
  });

  const setRestaurant = useRestaurantSetter();

  const [result, setResult] = useState<kakao.maps.services.PlacesSearchResult>(
    []
  );

  useEffect(() => {
    const ps = new kakao.maps.services.Places();

    if (debouncedValue)
      ps.keywordSearch(
        debouncedValue,
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
          }
        },
        {
          x: 37.566826,
          y: 126.9786567
        }
      );
  }, [debouncedValue]);

  const onItemClickHandler = useCallback(
    (item: kakao.maps.services.PlacesSearchResultItem) => {
      setRestaurant({
        address_name: item.address_name,
        category_group_name: item.category_group_name,
        id: item.id,
        place_name: item.place_name,
        road_address_name: item.road_address_name,
        x: item.x,
        y: item.y
      });
    },
    [setRestaurant]
  );

  return (
    <VStack
      css={css`
        ${width100}
      `}
    >
      <Input {...keyword} placeholder="여기서 음식점을 검색후 클릭하세요." />

      <VStack as="ul">
        {result.map(item => (
          <Box
            as="li"
            ml="3"
            key={item.id}
            onClick={() => onItemClickHandler(item)}
            css={css`
              cursor: pointer;
            `}
          >
            <Text _fontSize={14}>
              {item.place_name}
              <Badge ml="1" colorScheme="green">
                {item.category_name}
              </Badge>
            </Text>
            <Text _fontSize={12}>{item.address_name}</Text>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
};

export default RestaurantSearchSection;
