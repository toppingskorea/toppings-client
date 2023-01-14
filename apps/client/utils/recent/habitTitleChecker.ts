import { diets } from "~/constants/data/common";

const habitTitleChecker = (content: string) => {
  return diets.includes(content as Util.ElementType<typeof diets>)
    ? "Diet"
    : "Religion";
};

export default habitTitleChecker;
