import { neverChecker } from "@toppings/utils";
import type { Variants } from "framer-motion";

export const defaultEasing = [0.6, -0.05, 0.01, 0.99];

export const staggerOne: Variants = {
  animate: { transition: { staggerChildren: 0.1 } }
};

export const staggerHalf: Variants = {
  animate: { transition: { staggerChildren: 0.05 } }
};

export const defaultFadeInVariants: Variants = {
  initial: {
    opacity: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: "opacity"
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: "opacity"
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: "opacity"
  }
};

export const defaultScaleChangeVariants: Variants = {
  initial: {
    scale: 0
  },
  animate: {
    scale: 1
  }
};

const generateVariantFromTransformOrigin = (origin: Common.TransformOrigin) => {
  switch (origin) {
    case "top":
      return {
        y: "-100%"
      };
    case "right":
      return {
        x: "100%"
      };
    case "bottom":
      return {
        y: "100%"
      };
    case "left":
      return {
        x: "-100%"
      };
    default:
      return neverChecker(origin);
  }
};

export const defaultSlideFadeInVariants = (
  origin: Common.TransformOrigin
): Variants => {
  const originVariant = generateVariantFromTransformOrigin(origin);

  return {
    initial: {
      ...defaultFadeInVariants.initial,
      ...originVariant
    },
    animate: {
      ...defaultFadeInVariants.animate,
      // x or y
      [Object.keys(originVariant)[0]]: 0
    },
    exit: {
      ...defaultFadeInVariants.exit,
      ...originVariant
    }
  };
};

export const framerMocker = {
  initial: "initial",
  animate: "animate",
  exit: "exit"
} as const;
