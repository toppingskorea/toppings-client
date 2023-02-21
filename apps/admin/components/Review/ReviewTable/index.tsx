import {
  Table,
  TableCaption,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack
} from "@chakra-ui/react";
import { css, useTheme } from "@emotion/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Pagination } from "~/components/Common";
import { SwitchCase } from "~/components/Util";
import { useFetchReviews } from "~/server/review";

const ReviewTable = () => {
  const { colors } = useTheme();
  const { push } = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data: paginatedReviews } = useFetchReviews(currentPage);

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>
          <Pagination
            currentPage={currentPage}
            totalPage={paginatedReviews.totalPage}
            setCurrentPage={setCurrentPage}
          />
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Restaurant Name</Th>
            <Th>User name</Th>
            <Th>Date</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedReviews.items.map(review => (
            <Tr
              key={review.id}
              onClick={() => push(`/review/${review.id}`)}
              css={css`
                cursor: pointer;
              `}
            >
              <Td>{review.restaurantName}</Td>
              <Td>
                <VStack>
                  <strong>{review.name}</strong>
                  <span
                    css={css`
                      font-size: 14px;
                      color: ${colors.secondary[69]};
                    `}
                  >
                    {review.country}
                  </span>
                </VStack>
              </Td>
              <Td isNumeric>{review.modifiedAt}</Td>
              <Td isNumeric>
                <SwitchCase
                  value={review.publicYn}
                  caseBy={{
                    N: <Tag colorScheme="red">Rejected</Tag>,
                    P: <Tag colorScheme="green">Pending</Tag>,
                    Y: <Tag colorScheme="teal">Approved</Tag>
                  }}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ReviewTable;
