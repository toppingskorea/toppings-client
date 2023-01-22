declare module Recent {
  interface HistoryItem {
    id: number;
    keyword: string;
    type: string;
    category: string;
    content?: string;
    restaurantId?: number;
  }

  interface HistoryDTO extends Common.PaginationResponse<HistoryItem> {
    totalElements: number;
  }
}
