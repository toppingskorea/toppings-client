import { countries } from "~/constants/data/common";
import { objectValues } from "../common";

const DEFAULT_CDN_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/4x3/";
const DEFAULT_CDN_SUFFIX = "svg";

const countryToSvg = (country:string) => `${DEFAULT_CDN_URL}${objectValues(countries)
    .flat()
    .find(_country => _country.name === country)
    ?.code.toLowerCase()}.${DEFAULT_CDN_SUFFIX}`



export default countryToSvg