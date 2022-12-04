import type { ObjectKeys } from "./objectKeys";

const pick = <
  ObjectType extends Record<PropertyKey, unknown>,
  KeyTypes extends Array<ObjectKeys<ObjectType>>
>(
  obj: ObjectType,
  keys: KeyTypes
) => {
  const picked = {} as Pick<ObjectType, Util.ElementType<KeyTypes>>;
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    picked[key] = obj[key];
  }
  return picked;
};

export default pick;
