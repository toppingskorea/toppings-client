const isServer = () => {
  return typeof window === "undefined" && typeof global !== "undefined";
};

export default isServer;
