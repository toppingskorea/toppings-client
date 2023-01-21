declare module Recent {
  interface HistoryItem {
    id: number;
    keyword: string;
    type: string;
    category: string;
    content?: string;
    restaurantId?: number;
  }

  interface HistoryDTO {
    items: HistoryItem[];
    totalPage: number;
    page: number;
    size: number;
    start: number;
    end: number;
    prev: boolean;
    next: boolean;
    totalElements: number;
    pageList: number[];
  }
}
