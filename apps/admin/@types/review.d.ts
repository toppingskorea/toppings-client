declare module Review {
  interface BaseDTO {
    id: number;
    description: string;

    modifiedAt: string;
    name: string;
    country: string;
    habitContents: string;
    publicYn: "P" | "Y" | "N";
  }

  interface DTO extends BaseDTO {
    restaurantName: string;
    thumbnail: string;
  }

  interface DetailDTO extends BaseDTO {
    images: string[];
    userProfile: string;
  }
}
