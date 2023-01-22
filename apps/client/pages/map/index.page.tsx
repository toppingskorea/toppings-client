import { css } from "@emotion/react";
import { List } from "@svgs/map";
import { size } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { pin } from "~/assets/json";
import { MapMarker } from "~/components/Kakao";
import KakaoMap from "~/components/Kakao/KakaoMap";
import useMap from "./map.hooks";

const MapPage = () => {
  const app = useMap();

  return (
    <KakaoMap
      center={app.currentLocation}
      level={5}
      maxLevel={8}
      onDragEnd={app.mapEventHandler}
      onLoaded={app.mapEventHandler}
      onZoomChanged={app.mapEventHandler}
    >
      <KakaoMap.CurrentLocationButton />
      <KakaoMap.FilteringButton />
      {app.currentSelectCategory !== "Name" && (
        <KakaoMap.ViewStatusButton
          Icon={List}
          text="View lists"
          onClick={() => app.push("/map/viewList")}
        />
      )}

      {app.searchByFilteringList?.map(item => (
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
            onTap={() => app.push(`post/${item.id}`)}
            style={{
              width: "50px",
              height: "50px",
              position: "relative",
              top: "-7px",
              left: "25px",
              borderRadius: 25,
              cursor: "pointer"
            }}
          >
            <Lottie
              loop
              autoplay
              animationData={pin}
              css={css`
                ${size({
                  width: 100,
                  height: 115
                })}
                position: absolute;
                top: -38px;
                right: -25px;
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
