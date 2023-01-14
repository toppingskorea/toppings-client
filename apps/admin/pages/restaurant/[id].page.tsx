import { VStack } from "@chakra-ui/react";
import { Suspense } from "@suspensive/react";
import { PostDetail } from "~/components/Posts";
import Skeleton from "~/components/Skeleton";
import { generateComponent } from "~/utils";

const Restaurant = () => {
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
        <PostDetail />
      </Suspense.CSROnly>
    </div>
  );
};

export default Restaurant;
