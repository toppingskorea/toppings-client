import { Button, Flex, HStack, Select, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useToast } from "~/hooks";
import { useFetchReview, useUpdatePublication } from "~/server/review";

const ReviewDetail = () => {
  const { query } = useRouter();
  const toast = useToast();

  const { data: review } = useFetchReview(Number(query.id));

  const { mutate: updatePublicationMutate } = useUpdatePublication({
    onSuccess: () =>
      toast({
        title: "변경 성공",
        description: "실제 반영되었습니다.",
        status: "success"
      }),
    onError: () =>
      toast({
        title: "변경 실패",
        description: "개발자들에게 문의해봅시다",
        status: "error"
      })
  });

  const [rejectCause, setRejectCause] = useState("");

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
        <Button
          colorScheme="teal"
          onClick={() =>
            updatePublicationMutate({
              id: Number(query.id),
              isPub: true
            })
          }
        >
          승인하기
        </Button>

        <Flex gap={2}>
          <Select
            placeholder="리젝 사유"
            value={rejectCause}
            onChange={event => setRejectCause(event.currentTarget.value)}
          >
            <option value="Inappropriate photo">부적절한 사진</option>
            <option value="Inappropriate description">부적절한 설명</option>
          </Select>
          <Button
            colorScheme="red"
            onClick={() =>
              updatePublicationMutate({
                id: Number(query.id),
                cause: rejectCause,
                isPub: false
              })
            }
          >
            거절하기
          </Button>
        </Flex>
      </HStack>
    </VStack>
  );
};

export default ReviewDetail;
