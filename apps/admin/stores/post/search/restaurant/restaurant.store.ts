import { create } from "zustand";
import type {
  PostSearchRestaurantInitialState,
  PostSearchRestaurantState
} from "./restaurant.types";

const initialState: PostSearchRestaurantInitialState = {
  address_name: "",
  category_group_name: "",
  id: "",
  place_name: "",
  road_address_name: "",
  x: "",
  y: ""
};

export const usePostSearchRestaurantStore = create<PostSearchRestaurantState>(
  set => ({
    ...initialState,
    dispatchAll: value => set({ ...value }),
    dispatchInitialize: () => {
      set({ ...initialState });
    }
  })
);
