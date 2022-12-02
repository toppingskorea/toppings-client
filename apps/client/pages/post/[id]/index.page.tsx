import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getRestaurant } from "~/apis/restaurant";
import { useInternalRouter } from "~/hooks";
import { usePostUploadSetter, useRestaurantSetter } from "~/recoil/atoms";

const PostDetail = ({
  id
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { push } = useInternalRouter();

  const setRestaurant = useRestaurantSetter();
  const setPostUpload = usePostUploadSetter();

  return (
    <div>
      <button
        type="button"
        onClick={async () => {
          const result = await getRestaurant(+id);
          setRestaurant({
            address_name: result.address,
            id,
            category_group_name: "",
            place_name: result.name,
            road_address_name: result.address,
            x: String(result.longitude),
            y: String(result.latitude)
          });

          setPostUpload({
            description: result.description,
            images: result.images,
            type: result.type,
            id: result.id
          });

          push("/post/add");
        }}
      >
        수정하로 가자!
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  id: string;
}> = async context => ({
  props: {
    id: context.query.id as string
  }
});

export default PostDetail;
