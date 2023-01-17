import { css, useTheme } from "@emotion/react";
import { Flex } from "@toss/emotion-utils";
import Image from "next/image";
import { countryToSvg, hexToRgba } from "~/utils";

interface Props {
  isShadow?: boolean;
  country: string;
  alt?: string;
  size: number;
  padding: number;
}

const CircleCountry = ({
  isShadow,
  country,
  alt = "",
  size: _size,
  padding
}: Props) => {
  const { colors } = useTheme();
  return (
    <Flex.Center
      css={css`
        border-radius: 50%;
        background-color: ${colors.secondary.F1};
        padding: ${padding}px;
        ${isShadow &&
        `box-shadow: 0px 4px 4px ${hexToRgba(colors.black, 0.25)};`}
      `}
    >
      <Image
        src={countryToSvg(country)}
        alt={alt}
        width={_size}
        height={_size}
      />
    </Flex.Center>
  );
};

export default CircleCountry;
