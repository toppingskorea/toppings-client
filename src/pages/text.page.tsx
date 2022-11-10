import { useRecoilState, useRecoilValue } from "recoil";
import { useWebSocket } from "~/hooks";
import { headerAtom, mapSourceAtom } from "~/recoil/atoms";
import { withHeader } from "~/recoil/selectors";

const Text = () => {
  const [header, setHeader] = useRecoilState(withHeader);
  const maps = useRecoilValue(mapSourceAtom);
  const commons = useRecoilValue(headerAtom);

  const clickHandler = () => {
    setHeader("응가");
  };

  useWebSocket({
    destination: "/asd/asd",
    callback: () => console.log("소켓값도착")
  });

  return (
    <div>
      {header}
      <button type="button" onClick={clickHandler}>
        눌러봐요
      </button>
    </div>
  );
};

export default Text;
