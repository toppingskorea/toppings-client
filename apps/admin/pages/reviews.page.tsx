import { VStack } from "@chakra-ui/react";
import { Suspense } from "@suspensive/react";
import { ReviewTable } from "~/components/Reviews";
import Skeleton from "~/components/Skeleton";
import { useSetHeader } from "~/hooks";
import { generateComponent } from "~/utils/common";

const Reviews = () => {
  useSetHeader("Reviews");

  return (
    <div>
      <Suspense.CSROnly
        fallback={
          <VStack>
            {generateComponent(
              <Skeleton.Box
                size={{
                  width: 600,
                  height: 50
                }}
              />,
              8
            )}
          </VStack>
        }
      >
        <ReviewTable />
      </Suspense.CSROnly>
    </div>
  );
};

export default Reviews;
