import { VStack } from "@chakra-ui/react";
import { Suspense } from "@suspensive/react";
import { RestaurantTable } from "~/components/Posts";
import Skeleton from "~/components/Skeleton";
import { useSetHeader } from "~/hooks";
import { generateComponent } from "~/utils/common";

const Posts = () => {
  useSetHeader("Posts");

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
        <RestaurantTable />
      </Suspense.CSROnly>
    </div>
  );
};

export default Posts;
