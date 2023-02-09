const parseHexValueStr = (str: string) => parseInt(str, 16);

const isRGBDecimalValue = (rgbDecimal: number) =>
  rgbDecimal >= 0 && rgbDecimal <= 255;

const isAlphaValue = (alpha: number) => alpha >= 0 && alpha <= 1;

const hexToRgba = (hex: string, alpha = 1) => {
  if (!isAlphaValue(alpha)) {
    throw new Error(`잘못된 알파값 입니다(0~1): ${alpha}`);
  }

  // eslint-disable-next-line no-param-reassign
  hex = hex.length === 7 ? hex.slice(1) : hex;

  const r = parseHexValueStr(hex.slice(0, 2));
  const g = parseHexValueStr(hex.slice(2, 4));
  const b = parseHexValueStr(hex.slice(4, 6));

  if ([r, g, b].some(x => Number.isNaN(x) || !isRGBDecimalValue(x))) {
    throw new Error(`잘못된 hex값 입니다.: ${hex}`);
  }

  return `rgba(${r},${g},${b},${alpha})`;
};
export default hexToRgba;
