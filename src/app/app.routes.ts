import { Routes } from '@angular/router';
import { Hero } from './pages/hero/hero';

export const routes: Routes = [
    { path: '' , component:Hero },
    { path: 'about-us' , loadComponent: () => import('./pages/about/about').then( m => m.About) },
    { path: 'portfolio', loadComponent: () => import('./pages/portfolio/portfolio').then( m => m.Portfolio ) },
];
