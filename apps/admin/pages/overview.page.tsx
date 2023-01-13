import { CountCards } from "~/components/Overview";
import Skeleton from "~/components/Skeleton";
import { SSRSafeSuspense } from "~/components/Util";
import { useSetHeader } from "~/hooks";

const Overview = () => {
  useSetHeader("Overview");

  return (
    <div>
      <SSRSafeSuspense
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
      </SSRSafeSuspense>
    </div>
  );
};

export default Overview;
