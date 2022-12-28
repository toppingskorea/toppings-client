import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import {
  addRecentHistory,
  deleteAllRecentHistory,
  deleteRecentHistory,
  getDefaultMap,
  getEatingHabitByFiltering,
  getRestaurantByCountry,
  getRestaurantNameByFiltering
} from "./apis";

export const useDeleteAllRecentHistory = (
  options: Pick<
    UseMutationOptions<Awaited<ReturnType<typeof deleteAllRecentHistory>>>,
    "onSuccess"
  >
) => {
  return useMutation(deleteAllRecentHistory, options);
};

export const useDeleteRecentHistory = (
  options: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof deleteRecentHistory>>,
      unknown,
      Parameters<typeof deleteRecentHistory>[0]
    >,
    "onSuccess"
  >
) => {
  return useMutation(deleteRecentHistory, options);
};

export const useFetchDefaultMap = (
  options: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof getDefaultMap>>,
      unknown,
      Parameters<typeof getDefaultMap>[0]
    >,
    "onSuccess"
  >
) => {
  return useMutation(getDefaultMap, options);
};

export const useFetchEatingHabitByFiltering = (
  options: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof getEatingHabitByFiltering>>,
      unknown,
      Parameters<typeof getEatingHabitByFiltering>[0]
    >,
    "onSuccess"
  >
) => {
  return useMutation(getEatingHabitByFiltering, options);
};

export const useFetchRestaurantByCountry = (
  options: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof getRestaurantByCountry>>,
      unknown,
      Parameters<typeof getRestaurantByCountry>[0]
    >,
    "onSuccess"
  >
) => {
  return useMutation(getRestaurantByCountry, options);
};

export const useFetchRestaurantNameByFiltering = (
  options: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof getRestaurantNameByFiltering>>,
      unknown,
      Parameters<typeof getRestaurantNameByFiltering>[0]
    >,
    "onSuccess"
  >
) => {
  return useMutation(getRestaurantNameByFiltering, options);
};

export const useUploadRecentHistory = () => useMutation(addRecentHistory);
