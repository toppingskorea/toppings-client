import { Suspense } from "@suspensive/react";
import { CountCards } from "~/components/Overview";
import Skeleton from "~/components/Skeleton";
import { useSetHeader } from "~/hooks";

const Overview = () => {
  useSetHeader("Overview");

  return (
    <div>
      <Suspense.CSROnly
        fallback={
          <Skeleton.Box
            size={{
              width: 100,
              height: 50
            }}
          />
        }
      >
        <CountCards />
      </Suspense.CSROnly>
    </div>
  );
};

export default Overview;
