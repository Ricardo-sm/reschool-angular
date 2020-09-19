import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Routes's Components
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { LoggedInGuard } from './shared/logged-in.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', canActivate: [LoggedInGuard], component: LoginComponent },
  {
    path: 'home',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./components/home/home.module').then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
