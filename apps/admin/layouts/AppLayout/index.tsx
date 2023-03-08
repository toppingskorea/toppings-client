import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  VStack
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { QueryErrorBoundary } from "@suspensive/react-query";
import { padding } from "@toss/emotion-utils";
import type { PropsWithChildren } from "react";
import { Sidebar } from "~/components/Common";
import { useInternalRouter } from "~/hooks";
import { useHeaderStore } from "~/stores/common";

export const AppLayout = ({ children }: PropsWithChildren) => {
  const header = useHeaderStore(state => state.content);
  const { replace } = useInternalRouter();

  return (
    <Box>
      <HStack align="flex-start">
        <Sidebar />
        <VStack width="full">
          <Heading pt={4} fontSize="3xl">
            {header}
          </Heading>
          <Divider />
          <Box
            css={css`
              ${padding(20)}
            `}
          >
            <QueryErrorBoundary
              fallback={queryError => {
                return (
                  <Center>
                    <Button
                      onClick={() => {
                        replace("/login");
                        queryError.reset();
                      }}
                    >
                      로그인 하러 가기
                    </Button>
                  </Center>
                );
              }}
            >
              {children}
            </QueryErrorBoundary>
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
};
