import { useRouter } from "next/router";
import { ImageCarousel } from "~/components/Common";
import { OpenGraph } from "~/components/Util";
import { useFetchReview } from "~/server/review";

const ImageCarouselWrapper = () => {
  const { query } = useRouter();

  const { data: reviewDetail } = useFetchReview(Number(query.id));

  if (!reviewDetail) return <div>잠시후 다시 시도해주세요.</div>;

  return (
    <div>
      <OpenGraph
        title={reviewDetail.restaurantName}
        description={reviewDetail.description}
        imageUrl={reviewDetail.images[0]}
      />
      <ImageCarousel images={reviewDetail.images} />
    </div>
  );
};

export default ImageCarouselWrapper;
