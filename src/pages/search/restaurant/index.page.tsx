import { useEffect } from "react";
import { useInput } from "~/hooks";
import { neverChecker } from "~/utils";

const SearchRestaurant = () => {
  const { value, debouncedValue, onChange } = useInput({
    useDebounce: true,
    debounceTimeout: 300
  });

  useEffect(() => {
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(
      debouncedValue,
      (data, status) => {
        switch (status) {
          case kakao.maps.services.Status.OK:
            console.log("성공");
            break;
          case kakao.maps.services.Status.ZERO_RESULT:
            console.log("검색 결과가 없습니다.");
            break;
          case kakao.maps.services.Status.ERROR:
            console.log("오류발생");
            break;
          default:
            neverChecker(status);
        }
      },
      {
        category_group_code: ["FD6", "CE7"]
      }
    );
  }, [debouncedValue]);

  return (
    <div>
      <input value={value} onChange={onChange} />
    </div>
  );
};

export default SearchRestaurant;
