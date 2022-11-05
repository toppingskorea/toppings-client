import { useRecoilState, useRecoilValue } from "recoil";
import { headerAtom, mapSourceAtom } from "~/recoil/atoms";
import { withHeader } from "~/recoil/selectors";

const Text = () => {
  const [header, setHeader] = useRecoilState(withHeader);
  const maps = useRecoilValue(mapSourceAtom);
  const commons = useRecoilValue(headerAtom);

  const clickHandler = () => {
    setHeader("응가");
  };

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
