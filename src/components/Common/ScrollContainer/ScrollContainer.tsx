import { css, useTheme } from "@emotion/react";
import {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

type Value = {
  scrollContainerRef: RefObject<HTMLDivElement>;
  scrollContainerHeight: number;
  scrollContainerWidth: number;
};

const Context = createContext({} as Value);

export const useScrollContainer = () => useContext(Context);

type Props = {
  children: ReactNode;
};

const ScrollContainer = ({ children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const theme = useTheme();

  const [height, setHeight] = useState<number>(0);

  const scrollContainerHeight = ref.current?.getClientRects()[0].height ?? 0;
  const scrollContainerWidth = ref.current?.getClientRects()[0].width ?? 0;

  const handleResize = () => setHeight(window.innerHeight);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 애니메이션을 위해 자식 컴포넌트에서 다음과 같은 값들에 접근할 수 있습니다.
  const contextValue = useMemo(
    () => ({
      scrollContainerRef: ref,
      scrollContainerHeight,
      scrollContainerWidth
    }),
    [scrollContainerHeight, scrollContainerWidth]
  );

  return (
    <Context.Provider value={contextValue}>
      <div
        ref={ref}
        id="scrolled-container"
        css={css`
          display: flex;
          flex-direction: column;
          position: relative;
          overflow-x: hidden;
          max-width: 560px;
          background-color: ${theme.colors.black};
          margin: auto;
          height: ${`${height}`}px;

          ::-webkit-scrollbar {
            width: 0px;
          }
        `}
      >
        {children}
      </div>
    </Context.Provider>
  );
};

export default ScrollContainer;
