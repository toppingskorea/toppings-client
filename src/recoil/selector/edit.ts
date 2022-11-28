import { selector } from "recoil";
import { getUserInfo } from "~/apis";

const editSelector = selector({
  key: "editSelector",
  get: async () => {
    const user = await getUserInfo();
    return user;
  }
});

export default editSelector;
