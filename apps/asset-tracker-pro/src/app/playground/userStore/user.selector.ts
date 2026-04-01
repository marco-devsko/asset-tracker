import { UserState } from './user.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectApp = createFeatureSelector<UserState>('app')

export const selectCounter = createSelector(
  selectApp,
  (state: UserState) => state.result,
)
