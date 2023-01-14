import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import {
  addRecentHistory,
  deleteAllRecentHistory,
  deleteRecentHistory,
  getDefaultRestaurant,
  getRestaurantByCountry,
  getRestaurantByEatingHabit,
  getRestaurantByName
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
      Awaited<ReturnType<typeof getDefaultRestaurant>>,
      unknown,
      Parameters<typeof getDefaultRestaurant>[0]
    >,
    "onSuccess"
  >
) => {
  return useMutation(getDefaultRestaurant, options);
};

export const useFetchRestaurantByEatingHabit = (
  options: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof getRestaurantByEatingHabit>>,
      unknown,
      Parameters<typeof getRestaurantByEatingHabit>[0]
    >,
    "onSuccess"
  >
) => {
  return useMutation(getRestaurantByEatingHabit, options);
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

export const useFetchRestaurantByName = (
  options: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof getRestaurantByName>>,
      unknown,
      Parameters<typeof getRestaurantByName>[0]
    >,
    "onSuccess"
  >
) => {
  return useMutation(getRestaurantByName, options);
};

export const useUploadRecentHistory = () => useMutation(addRecentHistory);
