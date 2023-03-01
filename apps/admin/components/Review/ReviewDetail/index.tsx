import { Button, Flex, HStack, Select, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useFetchReview } from "~/server/review";
import useOnEventHandler from "./ReviewDetail.hooks";

const ReviewDetail = () => {
  const { query } = useRouter();

  const { data: review } = useFetchReview(Number(query.id));

  const {
    onApproveButtonClickHandler,
    onRejectButtonClickHandler,
    onChangeRejectCauseHandler,
    rejectCause
  } = useOnEventHandler(Number(query.id));

  return (
    <VStack>
      <HStack>
        {review.images.map(image => (
          <Image key={image} src={image} alt="" width={150} height={150} />
        ))}
      </HStack>

      <Text fontSize="4xl" as="mark">
        {review.country}
      </Text>
      <Text fontSize="3xl">{review.description}</Text>
      <Text fontSize="2xl">{review.habitContents}</Text>
      <Text fontSize="1xl">{review.modifiedAt}</Text>

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
          </Select>
          <Button colorScheme="red" onClick={onRejectButtonClickHandler}>
            거절하기
          </Button>
        </Flex>
      </HStack>
    </VStack>
  );
};

export default ReviewDetail;
