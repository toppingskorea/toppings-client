export type PostSearchRestaurantInitialState = Pick<
  kakao.maps.services.PlacesSearchResultItem,
  | "address_name"
  | "category_group_name"
  | "id"
  | "place_name"
  | "road_address_name"
  | "x"
  | "y"
>;

export type PostSearchRestaurantState = PostSearchRestaurantInitialState & {
  dispatchAll: (value: PostSearchRestaurantInitialState) => void;
  dispatchInitialize: VoidFunction;
};
