import { css } from "@emotion/react";
import { motion, useScroll } from "framer-motion";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Props {
  value?: number;
  min?: number;
  max?: number;
  minValue?: number;
  maxValue?: number;
  onChange?: (value: number) => void;
}

const Slider = ({
  value: outerValue = 50,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = () => {},
  min = 0,
  max = 100,
  minValue = Number(min),
  maxValue = Number(max)
}: Props) => {
  const [value, setValue] = useState<number>(outerValue);
  const progress = useMemo(
    () => (value - minValue) / (maxValue - minValue),
    [maxValue, minValue, value]
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const val = Number(event.target.value);
      setValue(val);
      onChange?.(val);
    },
    [onChange]
  );

  useEffect(() => {
    setValue(outerValue);
  }, [outerValue]);

  const { scrollYProgress } = useScroll();

  return (
    <div>
      <motion.input
        className="slider__input"
        type="range"
        value={value}
        min={minValue}
        max={maxValue}
        onChange={handleChange}
        style={{ width: scrollYProgress }}
        css={css`
          position: fixed;
        `}
      />
    </div>
  );
};

export default Slider;
