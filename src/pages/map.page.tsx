import { useEffect } from "react";
import { Exit } from "~/assets/svgs/common";
import { Text } from "~/components/Common/Typo";
import { useNavigationSetter } from "~/recoil/atoms";

const Map = () => {
  const setter = useNavigationSetter();

  useEffect(() => {
    setter({
      top: {
        right: <Exit />,
        title: <Text _fontSize={24}>Map</Text>
      },
      bottom: true
    });
  }, [setter]);

  return <div>map</div>;
};

export default Map;
