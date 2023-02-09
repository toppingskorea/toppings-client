export type ObjectKeys<T extends Record<PropertyKey, unknown>> = Exclude<
  keyof T,
  symbol
>;

const objectKeys = <Type extends Record<PropertyKey, unknown>>(
  obj: Type
): Array<ObjectKeys<Type>> => {
  return Object.keys(obj) as Array<ObjectKeys<Type>>;
};

export default objectKeys;
