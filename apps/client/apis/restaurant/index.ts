import axios from "axios";

export const getRestaurant = async (id: number) => {
  const { data } = await axios.get<{ data: Restaurant.DetailDTO }>(
    `/api/restaurant/${id}`
  );

  return data.data;
};
