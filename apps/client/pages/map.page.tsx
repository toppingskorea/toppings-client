import Map from "~/components/Map";
import { MapProvider } from "~/contexts";
import { useSetNavigation } from "~/hooks";
import { useFetchDefaultMap } from "~/mutations/recent";
import { useMapBoundsValue, useMapSearchByCountrySetter } from "~/recoil/atoms";

const MapPage = () => {
  useSetNavigation({
    bottom: true
  });
  const setMapSearchByCountry = useMapSearchByCountrySetter();
  const mapBounds = useMapBoundsValue();
  const { mutate: defaultMap } = useFetchDefaultMap({
    onSuccess: data => {
      setMapSearchByCountry(data);
    }
  });

  // 이거 사용하면 깃발 다 찍히기는 하는데 무한 호출 이슈 있음
  // useEffect(() => {
  //   if (mapBounds) {
  //     defaultMap(mapBounds);
  //   }
  // }, [defaultMap, mapBounds]);

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
