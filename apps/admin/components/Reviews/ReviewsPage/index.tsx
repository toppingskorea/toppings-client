import { VStack } from "@chakra-ui/react";
import { Suspense } from "@suspensive/react";
import { Skeleton } from "@toppings/components";
import ReviewTable from "~/components/Review/ReviewTable";
import { useSetHeader } from "~/hooks";
import { generateComponent } from "~/utils";

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
