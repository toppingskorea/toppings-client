declare module Profile {
  interface UserDTO {
    id: number;
    name: string;
    country: string;
    profile?: string;
    habits: {
      title: Common.EatingHabit;
      content: string;
    }[];
    postCount: number;
    scrapCount: number;
    reviewCount: number;
  }

  interface PostDTO extends Common.Coordinate {
    id: number;
    name: string;
    address: string;
    description: string;
    type: string;
    thumbnail: string;
    likeCount: number;
    writer: string;
    like: boolean;
  }
}
