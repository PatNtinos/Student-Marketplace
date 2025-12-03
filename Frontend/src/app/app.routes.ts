import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { GiftComponent } from './pages/gift/gift';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'gifts', component: GiftComponent },
];
