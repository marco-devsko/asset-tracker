import { createReducer, on } from '@ngrx/store';
import { initialState } from './user.state';
import * as UserActions from './user.actions';

export const userReducer = createReducer(
  initialState,
  on(UserActions.calculateSum, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserActions.calculateSumSuccess, (state, { result }) => ({
    ...state,
    result,
    loading: false,
  })),

  on(UserActions.calculateSumFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
