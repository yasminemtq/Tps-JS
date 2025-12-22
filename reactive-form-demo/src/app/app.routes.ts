import { Routes } from '@angular/router';
import { Register } from './register/register';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'register' },
  { path: 'register', component: Register }
];