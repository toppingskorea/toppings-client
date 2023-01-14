const checkDeeplyEqual = <T extends Util.NotNullishValue>(x: T, y: T) => {
  return JSON.stringify(x) === JSON.stringify(y);
};
export default checkDeeplyEqual;
