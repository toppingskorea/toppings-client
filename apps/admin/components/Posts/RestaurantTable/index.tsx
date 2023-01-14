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
import { useState } from "react";
import { Pagination } from "~/components/Common";
import { SwitchCase } from "~/components/Util";
import { useFetchRestaurants } from "~/server/restaurant";

const RestaurantTable = () => {
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
            <Tr key={restaurant.id}>
              <Td>{restaurant.name}</Td>
              <Td>
                <VStack>
                  <strong>{restaurant.writer}</strong>
                  <span>{restaurant.writer}</span>
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
