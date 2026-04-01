export interface UserState {
  result: number | null;
  error: string | null;
  loading: boolean;
}

export const initialState: UserState = {
  result: null,
  error: null,
  loading: false,
};
