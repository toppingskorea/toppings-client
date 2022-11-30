/* eslint-disable no-nested-ternary */
import { useCallback, useEffect, useMemo, useState } from "react";
import Box from "./Box";

interface Props {
  line?: number;
  fontSize?: number;
  lineHeight?: number;
  stepPercentage?: number;
  lineBreak?: number;
}

const Paragraph = ({
  line = 3,
  fontSize = 16,
  lineHeight = 1.6,
  stepPercentage = 10,
  lineBreak = 4
}: Props) => {
  const [randomForMiddle, setRandomForMiddle] = useState(0);
  const [randomForLast, setRandomForLast] = useState(0);

  useEffect(() => {
    setRandomForMiddle(Math.random());
    setRandomForLast(Math.random());
  }, []);

  const stepWidth = useCallback(
    (ratio: number) => Math.floor(ratio / stepPercentage) * stepPercentage,
    [stepPercentage]
  );

  const middleLineWidthRandomRatio = useMemo(
    () => stepWidth(80 + Math.floor(randomForMiddle * 20)),
    [stepWidth, randomForMiddle]
  );
  const lastLineWidthRandomRatio = useMemo(
    () => stepWidth(20 + Math.floor(randomForLast * 80)),
    [stepWidth, randomForLast]
  );

  const boxRenderer = useCallback(
    (index: number) => {
      if (index === line - 1) {
        return (
          <Box
            size={{
              width: `${lastLineWidthRandomRatio}%`,
              height: fontSize
            }}
            key={index}
          />
        );
      }

      if (!((index + 1) % lineBreak)) {
        return (
          <Box
            size={{
              width: `${middleLineWidthRandomRatio}%`,
              height: fontSize
            }}
            key={index}
          />
        );
      }

      return (
        <Box
          size={{
            width: "100%",
            height: fontSize
          }}
          key={index}
        />
      );
    },
    [
      fontSize,
      lastLineWidthRandomRatio,
      line,
      lineBreak,
      middleLineWidthRandomRatio
    ]
  );

  return (
    <div style={{ fontSize, lineHeight }}>
      {Array.from(Array(line), (_, index) => boxRenderer(index))}
    </div>
  );
};

export default Paragraph;
