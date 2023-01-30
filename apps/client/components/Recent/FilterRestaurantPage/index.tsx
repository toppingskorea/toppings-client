import { css } from "@emotion/react";
import { padding, Spacing } from "@toss/emotion-utils";
import { RestaurantCard, SearchInput } from "~/components/Common";
import { SearchLayout } from "~/components/Layout";
import { TagFamily } from "~/components/Recent";
import { OpenGraph } from "~/components/Util";
import { pick } from "~/utils";
import useFilterRestaurant from "./FilterRestaurantPage.hooks";

const FilterRestaurantPage = () => {
  const app = useFilterRestaurant();

  return (
    <>
      <OpenGraph title="Search Restaurant" />
      <SearchLayout>
        <SearchInput
          onSubmit={() => {
            app.fetchRestaurantByNameMutate(app.keyword.value);
          }}
          placeholder="Search restaurant"
          setValue={app.setValue}
          {...app.keyword}
        />
      </SearchLayout>
      <TagFamily isBlur />

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
      <Spacing size={150} />
    </>
  );
};

export default FilterRestaurantPage;
