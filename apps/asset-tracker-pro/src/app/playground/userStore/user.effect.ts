import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../services/api.service';
import * as UserActions from './user.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);

  calculateSum$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.calculateSum),
      mergeMap(({ a, b }) =>
        this.apiService.calculateSum(a, b).pipe(
          map((response) =>
            UserActions.calculateSumSuccess({ result: response })
          ),
          catchError((e) =>
            of(UserActions.calculateSumFailure({ error: e.message }))
          )
        )
      )
    )
  );
}
