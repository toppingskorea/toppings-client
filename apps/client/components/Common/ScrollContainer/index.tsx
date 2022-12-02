import { css } from "@emotion/react";
import { flex, height100 } from "@toss/emotion-utils";
import type { PropsWithChildren, RefObject } from "react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { hiddenScroll } from "~/styles/emotionUtils";

type Value = {
  scrollContainerRef: RefObject<HTMLDivElement>;
  scrollContainerHeight: number;
  scrollContainerWidth: number;
};

const Context = createContext({} as Value);

export const useScrollContainer = () => useContext(Context);

const ScrollContainer = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState<number>(0);

  const scrollContainerHeight = ref.current?.getClientRects()[0].height ?? 0;
  const scrollContainerWidth = ref.current?.getClientRects()[0].width ?? 0;

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);

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
          ${flex({ direction: "column" })}
          ${height100}
          position: relative;
          overflow-x: hidden;
          ${hiddenScroll}
        `}
      >
        {children}
      </div>
    </Context.Provider>
  );
};

export default ScrollContainer;
