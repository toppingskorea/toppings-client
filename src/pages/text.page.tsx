import type { ChangeEvent } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { textState } from "~/stores/atoms/common";
import { textLengthState } from "~/stores/selectors/common";

const Text = () => {
  const setText = useSetRecoilState(textState);
  const textLength = useRecoilValue(textLengthState);

  const onChangeHandler = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>) => {
    setText(value);
  };

  return (
    <div>
      <input onChange={onChangeHandler} />
      <p>Text의 길이: {textLength}</p>
    </div>
  );
};

export default Text;
