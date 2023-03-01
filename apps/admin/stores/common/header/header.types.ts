export interface HeaderInitialState {
  content: string;
}

export interface HeaderState extends HeaderInitialState {
  dispatchHeader: (value: HeaderInitialState["content"]) => void;
}
