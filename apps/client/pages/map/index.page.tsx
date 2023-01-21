import { css } from "@emotion/react";
import { List } from "@svgs/map";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { pin } from "~/assets/json";
import { MapMarker } from "~/components/Kakao";
import KakaoMap from "~/components/Kakao/KakaoMap";
import { useSetNavigation } from "~/hooks";
import {
  useCurrentHabitTitleValue,
  useCurrentLocationReset,
  useCurrentLocationState,
  useCurrentSelectCategoryValue,
  useCurrentSelectKeywordValue,
  type Direction
} from "~/recoil/atoms";
import {
  useFetchDefaultMap,
  useFetchRestaurantByCountry,
  useFetchRestaurantByEatingHabit
} from "~/server/recent";

const MapPage = () => {
  const [_bounds, setBounds] = useState<kakao.maps.LatLngBounds & Direction>();
  const [currentLocation, setCurrentLocation] = useCurrentLocationState();
  const currentLocationReset = useCurrentLocationReset();
  const { push } = useRouter();
  const [searchByFilteringList, setSearchByFilteringList] =
    useState<Restaurant.SearchByFilteringDTO[]>();
  const currentSelectKeyword = useCurrentSelectKeywordValue();
  const currentSelectCategory = useCurrentSelectCategoryValue();
  const currentHabitTitle = useCurrentHabitTitleValue();
  const { mutate: defaultMapMutate } = useFetchDefaultMap({
    onSuccess: data => {
      setSearchByFilteringList(data);
    }
  });

  // 필터링버튼 키워드를 exit 했을 경우 맵 bounds 안의 식당들을 불러옵니다
  useEffect(() => {
    if (!currentSelectKeyword) {
      defaultMapMutate(_bounds!);
    }
  }, [_bounds, currentLocationReset, currentSelectKeyword, defaultMapMutate]);

  useSetNavigation({
    bottom: true
  });

  const { mutate: fetchRestaurantByEatingHabitMutate } =
    useFetchRestaurantByEatingHabit({
      onSuccess: data => {
        setSearchByFilteringList(data);
      }
    });

  const { mutate: fetchRestaurantByCountryMutate } =
    useFetchRestaurantByCountry({
      onSuccess: data => {
        setSearchByFilteringList(data);
      }
    });

  const mapEventHandler = (map: kakao.maps.Map) => {
    const bounds = map.getBounds() as kakao.maps.LatLngBounds & Direction;
    const getCenter = map.getCenter();

    setCurrentLocation({
      latitude: getCenter.getLat(),
      longitude: getCenter.getLng()
    });

    setBounds(bounds);

    // useEffect에서 해당 기능을 처리해줍니다.
    if (!currentSelectKeyword) {
      return;
    }

    if (currentSelectCategory === "Habit") {
      fetchRestaurantByEatingHabitMutate({
        habit: currentSelectKeyword,
        habitTitle: currentHabitTitle,
        direction: bounds
      });
    } else if (currentSelectCategory === "Country") {
      fetchRestaurantByCountryMutate({
        country: currentSelectKeyword,
        direction: bounds
      });
    }
  };

  return (
    <KakaoMap
      center={currentLocation}
      level={5}
      maxLevel={8}
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

      {searchByFilteringList?.map(item => (
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
