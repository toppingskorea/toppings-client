import axios from "axios";
import { env } from "~/constants";

export const getRestaurant = async ({
  id,
  ssr
}: {
  id: string;
  ssr?: boolean;
}) => {
  const { data } = await axios.get<{ data: Restaurant.DetailDTO }>(
    `${ssr ? env.TOPPINGS_SERVER_URL : "/api"}/restaurant/${id}`
  );

  return data.data;
};
