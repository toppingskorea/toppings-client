/* eslint-disable @typescript-eslint/consistent-type-imports */
declare module Restaurant {
  interface BaseDTO extends Common.Coordinate {
    id: number;
    name: string;
    address: string;
    description: string;
    type: Util.ElementType<
      typeof import("~/constants/data/common").types
    >["label"];
    thumbnail: string;
    likeCount: number;
    writer: string;
    like: boolean;
  }

  interface SearchByFilteringDTO extends BaseDTO {
    address: string;
    filterLikeCount?: number;
  }

  type CardDTO = Pick<
    SearchByFilteringDTO,
    | "id"
    | "thumbnail"
    | "type"
    | "writer"
    | "name"
    | "address"
    | "like"
    | "likeCount"
    | "filterLikeCount"
  >;

  interface DetailDTO extends Omit<BaseDTO, "thumbnail"> {
    images: string[];
    code: string;
    country: string;
    scrap: boolean;
    mine: boolean;
  }

  interface LikePercentDTO {
    countryPercent: {
      country: string;
      count: number;
      percent: number;
    }[];

    habitPercent: {
      habit: string;
      count: number;
      percent: number;
    }[];
  }

  interface ReviewDTO {
    id: number;
    thumbnail: string;
    modifiedAt: string;
    name: string;
    country: string;
    isMine: boolean;
    description: string;
    restaurantName: string;
    images: string[];
    habits: string[];
    userProfile?: string;
  }
}
