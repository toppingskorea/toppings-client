import { useRouter } from "next/router";
import { ImageCarousel } from "~/components/Common";
import { useFetchRestaurant } from "~/server/restaurant";

const ImageCarouselWrapper = () => {
  const { query } = useRouter();

  const { data: restaurantDetail } = useFetchRestaurant(Number(query.id));

  return <ImageCarousel images={restaurantDetail.images} />;
};

export default ImageCarouselWrapper;
