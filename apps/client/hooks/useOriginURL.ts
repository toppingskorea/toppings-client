import { isServer } from "@toppings/utils";
import { useInternalRouter } from "~/hooks";

const getOriginURL =
  !isServer() && window.location.origin ? window.location.origin : "";

export const useOriginURL = () => {
  const { asPath } = useInternalRouter();

  return { originURL: `${getOriginURL}${asPath}` };
};
