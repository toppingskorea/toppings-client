import { useCallback, useState, type ChangeEvent } from "react";
import { useDebounce as useDebounceHook } from ".";

interface Props {
  /**
   * input state가 initializing 될 때 넣을 값입니다.
   *
   * @default ''
   */
  initialValue?: string;

  /**
   * debounce 효과를 사용할 것인지 정의합니다.
   *
   * @default `false`
   */
  useDebounce?: boolean;

  /**
   * debounce 효과를 사용할 때의 timeout 시간입니다. (단위: ms)
   *
   * @default `150`
   */
  debounceTimeout?: number;
}

/**
 * @name useInput
 * @description
 * input 태그에 주입되는 string 타입을 편하게 사용할 수 있도록 합니다.
 *
 * @example
 * const { value, setValue, onChange } = useInput({ useDebounce: false });
 * const { value, debouncedValue, setValue, onChange } = useInput({ useDebounce: true });
 * const { value, debouncedValue, onChange } = useInput({
 *   useDebounce: true,
 *   debounceTimeout: 300
 * });
 */
const useInput = ({
  initialValue = "",
  useDebounce = false,
  debounceTimeout = 150
}: Props) => {
  const [value, setValue] = useState<string>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<string>(initialValue);

  const handleSetDebounceValue = useDebounceHook(
    (value: string) => setDebouncedValue(value),
    debounceTimeout
  );

  const handleSetValue = useCallback(
    (value: string) => {
      setValue(value);

      if (useDebounce) handleSetDebounceValue(value);
    },
    [handleSetDebounceValue, useDebounce]
  );

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      handleSetValue(event.target.value);
    },
    [handleSetValue]
  );

  return {
    props: {
      value,
      /**
       * input 요소의 onChange 를 처리하는 함수입니다.
       *
       * ```js
       * <input value={...} onChange={onChange} />
       * ```
       */
      onChange
    },

    setValue: handleSetValue,

    /**
     * value를 debounce한 string입니다.
     *
     * `useDebounce`가 `true`로 설정되어 있어야 작동합니다.
     */
    debouncedValue
  };
};

export default useInput;
