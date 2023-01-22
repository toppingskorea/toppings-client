declare module Notice {
  interface DTO {
    userName: string;
    country: string;
    content: string;
    alarmType: "Like" | "Review" | "Scrap" | "Reject";
    restaurantName: string;
    thumbnail: string;
  }
}
