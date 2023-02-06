import type { Props } from ".";

// eslint-disable-next-line import/prefer-default-export
export const useHideInput = ({
  images,
  totalNumber
}: Pick<Props, "images" | "totalNumber">) => ({
  hideInput: images.length === totalNumber
});
