import type { ObjectKeys } from "./objectKeys";

export const objectValues = <Type extends Record<PropertyKey, unknown>>(
  obj: Type
): Array<Type[ObjectKeys<Type>]> => {
  return Object.values(obj) as Array<Type[ObjectKeys<Type>]>;
};
