import { useInternalRouter } from "~/hooks";
import { isServer } from "~/utils";

const getOriginURL =
  !isServer() && window.location.origin ? window.location.origin : "";

const useOriginURL = () => {
  const { asPath } = useInternalRouter();

  return { originURL: `${getOriginURL}${asPath}` };
};

export default useOriginURL;
