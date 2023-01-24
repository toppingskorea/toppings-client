import { VStack } from "@chakra-ui/react";
import { Suspense } from "@suspensive/react";
import { ReviewDetail } from "~/components/Reviews";
import Skeleton from "~/components/Skeleton";
import { generateComponent } from "~/utils";

const Review = () => {
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
        <ReviewDetail />
      </Suspense.CSROnly>
    </div>
  );
};

export default Review;
