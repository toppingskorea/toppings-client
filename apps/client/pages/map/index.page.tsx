import { css } from "@emotion/react";
import { List } from "@svgs/map";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useRouter } from "next/router";
import { pin } from "~/assets/json";
import { MapMarker } from "~/components/Kakao";
import KakaoMap, { DEFAULT_INITIAL_CENTER } from "~/components/Kakao/KakaoMap";
import { useSetNavigation } from "~/hooks";
import {
  useCurrentSelectCategoryValue,
  useCurrentSelectKeywordValue,
  type Direction
} from "~/recoil/atoms";
import { useFetchDefaultMap } from "~/server/recent";

const MapPage = () => {
  const { push } = useRouter();
  const currentSelectKeyword = useCurrentSelectKeywordValue();
  const currentSelectCategory = useCurrentSelectCategoryValue();
  const { mutate: defaultMapMutate, data: defaultMapList } = useFetchDefaultMap(
    {
      onSuccess: () => {
        console.log("success");
      }
    }
  );

  useSetNavigation({
    bottom: true
  });

  const mapEventHandler = (map: kakao.maps.Map) => {
    defaultMapMutate(map.getBounds() as kakao.maps.LatLngBounds & Direction);

    console.log(currentSelectCategory);
  };

  return (
    <KakaoMap
      center={DEFAULT_INITIAL_CENTER}
      level={6}
      maxLevel={7}
      onDragEnd={mapEventHandler}
      onLoaded={mapEventHandler}
      onZoomChanged={mapEventHandler}
    >
      <KakaoMap.CurrentLocationButton />
      <KakaoMap.FilteringButton />
      {currentSelectKeyword.length ? (
        <KakaoMap.ViewStatusButton
          Icon={List}
          text="View lists"
          onClick={() => push("/map/viewList")}
        />
      ) : (
        <div />
      )}

      {defaultMapList?.map(item => (
        <MapMarker
          key={item.id}
          position={{
            latitude: item.latitude,
            longitude: item.longitude
          }}
        >
          <motion.div
            initial={{
              scale: 0,
              y: 40
            }}
            animate={{ scale: 1, y: 0 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onTap={() => push(`post/${item.id}`)}
            style={{
              width: 100,
              height: 115,
              position: "relative",
              borderRadius: 25,
              cursor: "pointer"
            }}
          >
            <Lottie
              loop
              autoplay
              animationData={pin}
              css={css`
                position: absolute;
                bottom: -8;
                pointer-events: none;
                user-select: none;
              `}
            />
          </motion.div>
        </MapMarker>
      ))}
    </KakaoMap>
  );
};

export default MapPage;
