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
import { useFetchRestaurants } from "~/server/restaurant";

const RestaurantTable = () => {
  const { colors } = useTheme();
  const { push } = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data: paginatedRestaurants } = useFetchRestaurants(currentPage);

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>
          <Pagination
            currentPage={currentPage}
            totalPage={paginatedRestaurants.totalPage}
            setCurrentPage={setCurrentPage}
          />
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Post details</Th>
            <Th>User name</Th>
            <Th>Date</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedRestaurants.items.map(restaurant => (
            <Tr
              key={restaurant.id}
              onClick={() => push(`/restaurant/${restaurant.id}`)}
              css={css`
                cursor: pointer;
              `}
            >
              <Td>{restaurant.name}</Td>
              <Td>
                <VStack>
                  <strong>{restaurant.writer}</strong>
                  <span
                    css={css`
                      font-size: 14px;
                      color: ${colors.secondary[69]};
                    `}
                  >
                    {restaurant.country}
                  </span>
                </VStack>
              </Td>
              <Td isNumeric>{restaurant.createDate}</Td>
              <Td isNumeric>
                <SwitchCase
                  value={restaurant.publicYn}
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

export default RestaurantTable;
