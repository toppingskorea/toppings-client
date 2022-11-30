import Map from "~/components/Map";
import { MapProvider } from "~/contexts";
import { useSetNavigation } from "~/hooks";

const MapPage = () => {
  useSetNavigation({
    bottom: true
  });

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
