import { useRouter } from "next/router";
import { ImageCarousel } from "~/components/Common";
import { useFetchReview } from "~/server/review";

const ImageCarouselWrapper = () => {
  const { query } = useRouter();

  const { data: reviewDetail } = useFetchReview(Number(query.id));

  if (!reviewDetail) return <div>잠시후 다시 시도해주세요.</div>;

  return (
    <div>
      <ImageCarousel images={reviewDetail.images} />
    </div>
  );
};

export default ImageCarouselWrapper;
