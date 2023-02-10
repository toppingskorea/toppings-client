import { usePostUploadState } from "@atoms/post";
import { useRestaurantValue } from "@atoms/search";
import { Input, Select, VStack } from "@chakra-ui/react";
import { Spacing } from "@toss/emotion-utils";
import { Gallery, Text } from "~/components/Common";
import { types } from "~/constants/data/common";
import { Register } from "./CTAButton";
import RestaurantSearchSection from "./RestaurantSearchSection";

const PostUploadPage = () => {
  const restaurant = useRestaurantValue();
  const [postUpload, setPostUpload] = usePostUploadState();

  return (
    <VStack width="800px">
      <Text _fontSize={20}>Picture</Text>

      <Gallery
        images={postUpload.images}
        setImages={images => setPostUpload({ ...postUpload, images })}
      />

      <RestaurantSearchSection />

      <Text _fontSize={20}>음식점 정보</Text>
      <Input
        value={`${restaurant?.place_name ?? "식당 이름"} / ${
          restaurant?.road_address_name ?? "주소"
        }`}
        readOnly
      />

      <Text _fontSize={20}>Description</Text>
      <Input
        as="textarea"
        height={156}
        placeholder={`Please write a detailed description\nof the food`}
        value={postUpload.description}
        onChange={e =>
          setPostUpload({ ...postUpload, description: e.target.value })
        }
      />

      <Input
        placeholder="인스타그램 아이디를 입력하세요.(선택)"
        value={postUpload.instagramId ?? ""}
        maxLength={30}
        onChange={e =>
          setPostUpload(postUpload => ({
            ...postUpload,
            instagramId: e.target.value
          }))
        }
      />

      <Select
        placeholder="음식점 타입"
        value={postUpload.type}
        onChange={event =>
          setPostUpload(postUpload => ({
            ...postUpload,
            type: event.currentTarget.value as Util.ElementType<
              typeof types
            >["label"]
          }))
        }
      >
        {types.map(type => (
          <option value={type.value} key={type.label}>
            {type.label}
          </option>
        ))}
      </Select>

      <Spacing size={45} />

      <Register />

      <Spacing size={34} />
    </VStack>
  );
};

export default PostUploadPage;
