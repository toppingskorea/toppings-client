import { useHeaderValue } from "@atoms/header";
import { Box, Divider, Heading, HStack, VStack } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import { Sidebar } from "~/components/Common";

const AppLayout = ({ children }: PropsWithChildren) => {
  const header = useHeaderValue();

  return (
    <Box>
      <HStack align="flex-start">
        <Sidebar />
        <VStack width="full">
          <Heading pt={4} fontSize="3xl">
            {header}
          </Heading>
          <Divider />
          {children}
        </VStack>
      </HStack>
    </Box>
  );
};

export default AppLayout;
