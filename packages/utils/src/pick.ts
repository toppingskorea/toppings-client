import type { ObjectKeys } from "./objectKeys";
import type { ElementType } from "./types";

const pick = <
  ObjectType extends Record<PropertyKey, unknown>,
  KeyTypes extends Array<ObjectKeys<ObjectType>>
>(
  obj: ObjectType,
  keys: KeyTypes
) => {
  const picked = {} as Pick<ObjectType, ElementType<KeyTypes>>;
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    picked[key] = obj[key];
  }
  return picked;
};

export default pick;
