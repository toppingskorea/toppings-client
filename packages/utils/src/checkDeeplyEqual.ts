/* eslint-disable @typescript-eslint/ban-types */
type NotNullishValue = {};

const checkDeeplyEqual = <T extends NotNullishValue>(x: T, y: T) => {
  return JSON.stringify(x) === JSON.stringify(y);
};
export default checkDeeplyEqual;
