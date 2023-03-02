import { Input, Select, VStack } from "@chakra-ui/react";
import { Spacing } from "@toss/emotion-utils";
import { Gallery, Text } from "~/components/Common";
import { types } from "~/constants/data/common";
import { usePostSearchRestaurantStore } from "~/stores/post";
import { Register } from "./CTAButton";
import {
  useDescription,
  useImages,
  useInstagramId,
  useType
} from "./PostUploadPage.hooks";
import RestaurantSearchSection from "./RestaurantSearchSection";

const PostUploadPage = () => {
  const { placeName, roadAddressName } = usePostSearchRestaurantStore(
    state => ({
      placeName: state.place_name,
      roadAddressName: state.road_address_name
    })
  );

  const images = useImages();
  const description = useDescription();
  const instagramId = useInstagramId();
  const type = useType();

  return (
    <VStack width="800px">
      <Text _fontSize={20}>Picture</Text>

      <Gallery {...images} />

      <RestaurantSearchSection />

      <Text _fontSize={20}>음식점 정보</Text>
      <Input
        value={`${placeName ?? "식당 이름"} / ${roadAddressName ?? "주소"}`}
        readOnly
      />

      <Text _fontSize={20}>Description</Text>
      <Input
        as="textarea"
        height={156}
        placeholder={`Please write a detailed description\nof the food`}
        {...description}
      />

      <Input
        placeholder="인스타그램 아이디를 입력하세요.(선택)"
        maxLength={30}
        {...instagramId}
      />

      <Select placeholder="음식점 타입" {...type}>
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
