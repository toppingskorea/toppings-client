import { createContext, useContext, type RefObject } from "react";
import useMapProvider from "./MapProvider.hooks";

const Context = createContext({
  map: null,
  mapRef: { current: null }
} as {
  map: kakao.maps.Map | null;
  mapRef: RefObject<HTMLDivElement>;
});

export const useMap = () => useContext(Context);

export const MapProvider = ({ children }: Util.PropsWithChild) => {
  const app = useMapProvider();

  return (
    <Context.Provider value={app.providerValue}>{children}</Context.Provider>
  );
};
