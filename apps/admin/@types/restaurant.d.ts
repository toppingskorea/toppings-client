/* eslint-disable @typescript-eslint/consistent-type-imports */
declare module Restaurant {
  interface DTO extends Common.Coordinate {
    id: number;
    name: string;
    address: string;
    description: string;
    type: string;
    thumbnail: string;
    likeCount: number;
    writer: string;
    createDate: string;
    publicYn: "P" | "Y" | "N";
    like: boolean;
  }
}
