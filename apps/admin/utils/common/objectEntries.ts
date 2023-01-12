import type { ObjectKeys } from "./objectKeys";

const objectEntries = <Type extends Record<PropertyKey, unknown>>(
  obj: Type
): Array<[ObjectKeys<Type>, Type[ObjectKeys<Type>]]> => {
  return Object.entries(obj) as Array<
    [ObjectKeys<Type>, Type[ObjectKeys<Type>]]
  >;
};

export default objectEntries;
