import { HStack } from "@chakra-ui/react";
import { Suspense } from "@suspensive/react";
import Skeleton from "~/components/Skeleton";
import { useSetHeader } from "~/hooks";
import { generateComponent } from "~/utils";
import CountCards from "../CountCards";

const OverviewPage = () => {
  useSetHeader("Overview");

  return (
    <div>
      <Suspense.CSROnly
        fallback={
          <HStack gap={14}>
            {generateComponent(
              <Skeleton.Box
                size={{
                  width: 100,
                  height: 50
                }}
              />,
              3
            )}
          </HStack>
        }
      >
        <CountCards />
      </Suspense.CSROnly>
    </div>
  );
};

export default OverviewPage;
