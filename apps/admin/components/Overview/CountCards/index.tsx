import { Stat, StatGroup, StatLabel, StatNumber } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useFetchCount } from "~/server/overview";

const CountCards = () => {
  const { data: count } = useFetchCount();

  return (
    <StatGroup gap={20}>
      <Stat>
        <NowrapStatLabel>Total user</NowrapStatLabel>
        <StatNumber>{count.totalUserCount}</StatNumber>
      </Stat>
      <Stat>
        <NowrapStatLabel>Total posts</NowrapStatLabel>
        <StatNumber>{count.totalPostCount}</StatNumber>
      </Stat>
      <Stat>
        <NowrapStatLabel>Total reviews</NowrapStatLabel>
        <StatNumber>{count.totalReviewCount}</StatNumber>
      </Stat>
    </StatGroup>
  );
};

export default CountCards;

const NowrapStatLabel = styled(StatLabel)`
  white-space: nowrap;
`;
