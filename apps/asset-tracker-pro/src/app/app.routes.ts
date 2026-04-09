import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'show-assets', pathMatch: 'full' },
  {
    path: 'show-assets',
    loadComponent: () =>
      import('./features/assets/show-assets/show-assets.component').then(
        (m) => m.ShowAssetsComponent
      ),
  },
];
