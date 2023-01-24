declare module Notice {
  interface DTO {
    userName: string;
    country: string;
    content?: string;
    alarmType:
      | "Like"
      | "Review"
      | "Scrap"
      | "RejectReview"
      | "RejectRestaurant";
    restaurantName: string;
    thumbnail: string;
    profile: string;
    createDate: string;
  }
}
