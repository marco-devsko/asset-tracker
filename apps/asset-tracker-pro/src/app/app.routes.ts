import { Route } from '@angular/router';
import { AddAssetComponent } from './features/assets/add-asset/add-asset.component';
import { ShowSummaryComponent } from './features/assets/show-summary/show-summary.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'add-asset', pathMatch: 'full' },
  { path: 'add-asset', component: AddAssetComponent },
  { path: 'show-summary', component: ShowSummaryComponent },
];
