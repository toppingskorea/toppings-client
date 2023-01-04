import Map from "~/components/Map";
import { MapProvider } from "~/contexts";
import { useSetNavigation } from "~/hooks";
import { useCurrentSelectCategoryValue } from "~/recoil/atoms";

const MapPage = () => {
  const currentSelectCategory = useCurrentSelectCategoryValue();

  useSetNavigation({
    bottom: true
  });

  return (
    <MapProvider>
      <Map>
        <Map.MyLocationButton />
        <Map.RecentButton />
        <Map.FilteringButton />
        {currentSelectCategory.length ? <Map.ListButton /> : <div />}
      </Map>
    </MapProvider>
  );
};

export default MapPage;
