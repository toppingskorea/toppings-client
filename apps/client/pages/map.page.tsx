import { useEffect } from "react";
import Map from "~/components/Map";
import { MapProvider } from "~/contexts";
import { useSetNavigation } from "~/hooks";
import useFetchDefaultMap from "~/mutations/recent/useFetchDefaultMap";
import { useMapBoundsValue } from "~/recoil/atoms";

const MapPage = () => {
  useSetNavigation({
    bottom: true
  });
  const mapBounds = useMapBoundsValue();
  const { mutate: defaultMap } = useFetchDefaultMap({
    onSuccess: data => {
      console.log(data);
    }
  });

  useEffect(() => {
    if (mapBounds) {
      defaultMap(mapBounds);
    }
  }, [defaultMap, mapBounds]);

  return (
    <MapProvider>
      <Map>
        <Map.MyLocationButton />
        <Map.RecentButton />
        <Map.FilteringButton />
      </Map>
    </MapProvider>
  );
};

export default MapPage;
