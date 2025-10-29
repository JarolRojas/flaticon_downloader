import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Svg } from './pages/svg/svg';
import { Png } from './pages/png/png';


export const popupRoutes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'svg', component: Svg },
  { path: 'png', component: Png }
];
