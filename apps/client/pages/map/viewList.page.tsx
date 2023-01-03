import { css } from "@emotion/react";
import { Exit } from "@svgs/common";
import { padding, position } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Badge, RestaurantCard } from "~/components/Common";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { useSetNavigation } from "~/hooks";
import {
  useCurrentLocationSetter,
  useCurrentSelectCategorySetter,
  useMapSearchByCountryReset,
  useMapSearchByCountryValue
} from "~/recoil/atoms";
import { useUploadRecentHistory } from "~/server/recent";
import { pick } from "~/utils";

const ViewListPage = () => {
  const { push } = useRouter();
  const mapSearchValue = useMapSearchByCountryValue();
  const mapSearchReset = useMapSearchByCountryReset();
  const setCurrentLocation = useCurrentLocationSetter();
  const { mutate: uploadRecentHistoryMutate } = useUploadRecentHistory();
  const setCurrentSelectCategory = useCurrentSelectCategorySetter();

  useSetNavigation({
    top: {
      marginBottom: 85,
      right: {
        element: <Exit />,
        onClick: () => push("/map")
      }
    }
  });
  return (
    <>
      <motion.div
        variants={defaultSlideFadeInVariants("right")}
        {...framerMocker}
        css={css`
          ${position("absolute", { top: 114, left: 0 })}
        `}
      >
        <Badge attach="left">Eating habit</Badge>
      </motion.div>

      <div
        css={css`
          width: 100%;
          ${padding({
            x: 28
          })}
        `}
      >
        {mapSearchValue?.map(item => (
          <RestaurantCard
            key={item.id}
            whoLikes
            onClick={() => {
              setCurrentLocation({
                latitude: item.latitude,
                longitude: item.longitude
              });
              uploadRecentHistoryMutate({
                type: "Filter",
                keyword: item.name,
                category: "Name",
                content: item.address,
                restaurantId: item.id
              });
              setCurrentSelectCategory(item.name);
              mapSearchReset();

              push("/map");
            }}
            item={{
              ...pick({ ...item }, [
                "id",
                "thumbnail",
                "type",
                "writer",
                "name",
                "address",
                "like",
                "likeCount",
                "filterLikeCount"
              ])
            }}
          />
        ))}
      </div>
    </>
  );
};

export default ViewListPage;
