import { Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { BuilderComponent } from './builder/builder.component';
import { ErrorComponent } from './error/error.component';
import { TemplatesComponent } from './templates/templates.component';

export const routes: Routes = [
  { path: '', redirectTo: '/error', pathMatch: 'full' },
  { path: 'default', component: DefaultComponent, pathMatch: 'full' },
  { path: 'templates', component: TemplatesComponent, pathMatch: 'full' },
  { path: 'builder', component: BuilderComponent, pathMatch: 'full' },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' }
  // { path: 'home', component: Home, canActivate: [AuthGuard] },
  // { path: '**', component: Login },
];
