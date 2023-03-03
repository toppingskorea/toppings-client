/* eslint-disable no-sequences */
/* eslint-disable no-return-assign */
import { objectKeys, type ObjectKeys } from ".";
import type { ElementType } from "./types";

export const omit = <
  ObjectType extends Record<PropertyKey, unknown>,
  KeyTypes extends Array<ObjectKeys<ObjectType>>
>(
  obj: ObjectType,
  keys: KeyTypes
) => {
  return objectKeys(obj)
    .filter(
      (k): k is Exclude<ObjectKeys<ObjectType>, ElementType<KeyTypes>> =>
        !keys.includes(k)
    )
    .reduce(
      (acc, key) => ((acc[key] = obj[key]), acc),
      {} as Omit<ObjectType, ElementType<KeyTypes>>
    );
};
