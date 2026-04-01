import { createAction, props } from '@ngrx/store';

export const calculateSum = createAction(
  '[Sum] Calculate',
  props<{ a: number; b: number }>()
);

export const calculateSumSuccess = createAction(
  '[Sum] Calculate success',
  props<{ result: number }>()
);

export const calculateSumFailure = createAction(
  '[Sum] Calculate failure',
  props<{ error: string }>()
);


export const decrement
  = createAction('[User] Decrement user action');
