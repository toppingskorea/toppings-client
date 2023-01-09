import { List } from "@svgs/map";
import { useRouter } from "next/router";
import Map from "~/components/Map";
import { MapProvider } from "~/contexts";
import { useSetNavigation } from "~/hooks";
import { useCurrentSelectCategoryValue } from "~/recoil/atoms";

const MapPage = () => {
  const { push } = useRouter();
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
        {currentSelectCategory.length ? (
          <Map.ViewStatusButton
            Icon={List}
            text="View lists"
            onClick={() => push("/map/viewList")}
          />
        ) : (
          <div />
        )}
      </Map>
    </MapProvider>
  );
};

export default MapPage;
