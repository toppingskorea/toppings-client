declare module Restaurant {
  interface BaseDTO extends Common.Coordinate {
    id: number;
    name: string;
    address: string;
    description: string;
    type: string;
    thumbnail: string;
    likeCount: number;
    createDate: string;
    // Pending, Approved, Rejected
    publicYn: "P" | "Y" | "N";
    like: boolean;
  }

  interface DTO extends BaseDTO {
    likeCount: number;
    country: string;
    writer: string;
  }

  interface DetailDTO extends BaseDTO {
    images: string[];
  }
}
