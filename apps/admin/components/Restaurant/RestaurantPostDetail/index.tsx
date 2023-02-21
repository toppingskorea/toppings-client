import { Button, Flex, HStack, Select, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useFetchRestaurant } from "~/server/restaurant";
import useOnEventHandler from "./RestaurantPostDetail.hooks";

const RestaurantPostDetail = () => {
  const { query } = useRouter();

  const { data: restaurant } = useFetchRestaurant(Number(query.id));

  const {
    onApproveButtonClickHandler,
    onRejectButtonClickHandler,
    onChangeRejectCauseHandler,
    rejectCause
  } = useOnEventHandler(Number(query.id));

  return (
    <VStack>
      <HStack>
        {restaurant.images.map(image => (
          <Image key={image} src={image} alt="" width={150} height={150} />
        ))}
      </HStack>

      <Text fontSize="4xl" as="mark">
        {restaurant.name}
      </Text>
      <Text fontSize="3xl">{restaurant.type}</Text>
      <Text fontSize="2xl">{restaurant.address}</Text>
      <Text fontSize="1xl">{restaurant.description}</Text>

      <HStack gap={10}>
        <Button colorScheme="teal" onClick={onApproveButtonClickHandler}>
          승인하기
        </Button>

        <Flex gap={2}>
          <Select
            placeholder="리젝 사유"
            value={rejectCause}
            onChange={onChangeRejectCauseHandler}
          >
            <option value="Inappropriate photo">부적절한 사진</option>
            <option value="Inappropriate description">부적절한 설명</option>
            <option value="Inappropriate food category">
              부적절한 카테고리
            </option>
            <option value="Inappropriate location">부적절한 위치</option>
          </Select>
          <Button colorScheme="red" onClick={onRejectButtonClickHandler}>
            거절하기
          </Button>
        </Flex>
      </HStack>
    </VStack>
  );
};

export default RestaurantPostDetail;
