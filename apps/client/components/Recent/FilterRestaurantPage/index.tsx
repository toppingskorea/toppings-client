import { css } from "@emotion/react";
import { pick } from "@toppings/utils";
import { padding, Spacing, Stack } from "@toss/emotion-utils";
import { RestaurantCard, SearchInput } from "~/components/Common";
import { SearchLayout } from "~/components/Layout";
import { TagFamily } from "~/components/Recent";
import { OpenGraph } from "~/components/Util";
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

      <Stack.Vertical
        gutter={12}
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
      </Stack.Vertical>

      <Spacing size={150} />
    </>
  );
};

export default FilterRestaurantPage;
