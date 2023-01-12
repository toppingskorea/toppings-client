import type { ObjectKeys } from "./objectKeys";

const objectValues = <Type extends Record<PropertyKey, unknown>>(
  obj: Type
): Array<Type[ObjectKeys<Type>]> => {
  return Object.values(obj) as Array<Type[ObjectKeys<Type>]>;
};

export default objectValues;
