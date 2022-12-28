declare module Recent {
  interface HistoryDTO {
    id: number;
    keyword: string;
    type: string;
    category: string;
    content?: string;
    restaurantId?: number;
  }
}
