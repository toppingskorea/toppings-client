import { VStack } from "@chakra-ui/react";
import { Suspense } from "@suspensive/react";
import Skeleton from "~/components/Skeleton";
import { generateComponent } from "~/utils";
import RestaurantPostDetail from "../RestaurantPostDetail";

const RestaurantDetailPage = () => {
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
        <RestaurantPostDetail />
      </Suspense.CSROnly>
    </div>
  );
};

export default RestaurantDetailPage;
