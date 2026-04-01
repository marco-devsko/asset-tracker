import { Route } from '@angular/router';
import { AddAssetComponent } from './features/assets/add-asset/add-asset.component';
import { ShowSummaryComponent } from './features/assets/show-summary/show-summary.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'add-asset', pathMatch: 'full' },
  { path: 'add-asset', component: AddAssetComponent },
  { path: 'show-summary', component: ShowSummaryComponent },
  {
    path: 'table',
    loadComponent: () =>
      import('./playground/table.component').then((m) => m.TableComponent),
  },
  {
    path: 'counter',
    loadComponent: () =>
      import('./playground/counter/counter.component').then(
        (m) => m.CounterComponent
      ),
  },
  {
    path: 'addproduser',
    loadComponent: () =>
      import('./playground/prod-users/add/add-user.component').then(
        (m) => m.AddUserComponent
      ),
  },
  {
    path: 'showprodusers',
    loadComponent: () =>
      import('./playground/prod-users/show/show-users.component').then(
        (m) => m.ShowUsersComponent
      ),
  },
];
