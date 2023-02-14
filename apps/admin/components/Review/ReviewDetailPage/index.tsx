import { VStack } from "@chakra-ui/react";
import { Suspense } from "@suspensive/react";
import Skeleton from "~/components/Skeleton";
import { generateComponent } from "~/utils";
import ReviewDetail from "../ReviewDetail";

const ReviewDetailPage = () => {
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

export default ReviewDetailPage;
