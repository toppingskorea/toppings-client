export type RegisterInfoInitialState = {
  country: string;
  habits: {
    title: Common.EatingHabit;
    content: string;
  }[];
};

export type RegisterInfoState = RegisterInfoInitialState & {
  dispatchCountry: (value: RegisterInfoInitialState["country"]) => void;
  dispatchHabits: (value: RegisterInfoInitialState["habits"]) => void;
};
