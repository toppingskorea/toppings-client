import { css } from "@emotion/react";
import { padding } from "@toss/emotion-utils";
import { RestaurantCard, SearchInput } from "~/components/Common";
import { SearchLayout } from "~/components/Layout";
import { TagFamily } from "~/components/Recent";
import { pick } from "~/utils";
import useRestaurant from "./restaurant.hooks";

const RecentPage = () => {
  const app = useRestaurant();

  return (
    <>
      <SearchLayout>
        <SearchInput
          onSubmit={() => {
            app.fetchRestaurantNameByFilteringMutate(app.keyword.value);
          }}
          placeholder="enter the restaurant name"
          setValue={app.setValue}
          {...app.keyword}
        />
      </SearchLayout>
      <TagFamily />

      {/* border는 임시로 넣어놨음 */}
      <div
        css={css`
          width: 100%;
          ${padding({
            x: 28
          })}
        `}
      >
        {app.restaurantList?.map(item => (
          <RestaurantCard
            key={item.id}
            onClick={() => app.restaurantCardClickHandler(item)}
            item={{
              ...pick({ ...item }, [
                "id",
                "thumbnail",
                "type",
                "writer",
                "name",
                "address",
                "like",
                "likeCount"
              ])
            }}
          />
        ))}
      </div>
    </>
  );
};

export default RecentPage;
