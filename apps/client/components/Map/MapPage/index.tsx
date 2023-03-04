import {
  useCurrentLocationValue,
  useFixedCurrentLocationValue
} from "@atoms/common";
import { css } from "@emotion/react";
import { List, Pin } from "@svgs/map";
import { hexToRgba } from "@toppings/utils";
import { Flex, padding, position, size } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { myLocation, rocket } from "~/assets/json";
import { Text } from "~/components/Common/Typo";
import { MapMarker } from "~/components/Kakao";
import KakaoMap from "~/components/Kakao/KakaoMap";
import { OpenGraph } from "~/components/Util";
import useMap from "./MapPage.hooks";

const MapPage = () => {
  const app = useMap();
  const currentLocation = useCurrentLocationValue();
  const fixedCurrentLocation = useFixedCurrentLocationValue();

  return (
    <>
      <OpenGraph title="Map" />
      <KakaoMap
        center={app.currentLocation}
        level={app.currentZoomLevel}
        maxLevel={13}
        onDragEnd={app.mapEventHandler}
        onLoaded={app.mapEventHandler}
        onZoomChanged={app.mapEventHandler}
        onTilesloaded={app.mapEventHandler}
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
              onClick={() => app.push(`post/${item.id}`)}
              style={{
                width: "50px",
                height: "50px",
                position: "relative",
                top: "0px",
                left: "25px",
                borderRadius: 25,
                cursor: "pointer"
              }}
            >
              <Pin
                css={css`
                  ${position("absolute", {
                    top: 0,
                    left: "50%"
                  })}
                  transform: translateX(-50%);
                  pointer-events: none;
                  user-select: none;
                `}
              />

              <Flex.Center
                css={css`
                  ${padding({
                    top: 43
                  })}
                `}
              >
                <Text
                  _color={app.colors.white}
                  _fontSize={13}
                  css={css`
                    ${padding({
                      x: 11,
                      y: 4
                    })}
                    border-radius: 100px;
                    background-color: ${hexToRgba(
                      app.colors.secondary[69],
                      0.7
                    )};
                  `}
                >
                  {item.name}
                </Text>
              </Flex.Center>
            </motion.div>
          </MapMarker>
        ))}
        {app.currentPositionLoading && (
          <Flex.Center
            css={css`
              ${position("absolute", {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
              })}
              ${size.full}
              background-color: ${hexToRgba(app.colors.black, 0.6)};
              z-index: ${app.zIndex.four};
            `}
          >
            <Lottie
              loop
              autoplay
              animationData={rocket}
              css={css`
                ${size({ width: 300, height: 300 })}
              `}
            />
          </Flex.Center>
        )}

        {fixedCurrentLocation.latitude && fixedCurrentLocation.longitude && (
          <MapMarker
            position={{
              latitude: fixedCurrentLocation.latitude,
              longitude: fixedCurrentLocation.longitude
            }}
          >
            <Lottie
              loop
              autoPlay
              animationData={myLocation}
              css={css`
                ${size({
                  width: 30,
                  height: 30
                })}
              `}
            />
          </MapMarker>
        )}
      </KakaoMap>
    </>
  );
};

export default MapPage;
