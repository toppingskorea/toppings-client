import { useEffect } from "react";
import { useInput } from "~/hooks";

const SearchRestaurant = () => {
  const { value, debouncedValue, onChange } = useInput({
    useDebounce: true,
    debounceTimeout: 300
  });

  useEffect(() => {
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(
      debouncedValue,
      (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          console.log(data);
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
