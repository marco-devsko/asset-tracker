import { Route } from '@angular/router';
import { ShowAssetsComponent } from './features/assets/show-assets/show-assets.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'show-assets', pathMatch: 'full' },
  { path: 'show-assets', component: ShowAssetsComponent },
];
