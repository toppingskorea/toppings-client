const Colors = {
  // gray
  white: "#FFF",
  black: "#000",

  dimColor: (opacity: number, color = "0,0,0") => `rgba(${color},${opacity})`
} as const;

export default Colors;
