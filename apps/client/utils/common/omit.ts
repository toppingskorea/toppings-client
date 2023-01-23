/* eslint-disable no-sequences */
/* eslint-disable no-return-assign */
import type { ObjectKeys } from "./objectKeys";
import objectKeys from "./objectKeys";

const omit = <
  ObjectType extends Record<PropertyKey, unknown>,
  KeyTypes extends Array<ObjectKeys<ObjectType>>
>(
  obj: ObjectType,
  keys: KeyTypes
) => {
  return objectKeys(obj)
    .filter(
      (k): k is Exclude<ObjectKeys<ObjectType>, Util.ElementType<KeyTypes>> =>
        !keys.includes(k)
    )
    .reduce(
      (acc, key) => ((acc[key] = obj[key]), acc),
      {} as Omit<ObjectType, Util.ElementType<KeyTypes>>
    );
};

export default omit;
