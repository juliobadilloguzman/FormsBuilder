import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'login', canActivate: [LoggedGuard], loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { path: 'registro', canActivate: [LoggedGuard], loadChildren: () => import('./components/signup/signup.module').then(m => m.SignupModule) },
  { path: 'formularios', loadChildren: () => import('./components/formularios/formularios.module').then(m => m.FormulariosModule), canActivate: [AuthGuard] },
  { path: 'builder', canActivate: [AuthGuard], loadChildren: () => import('./components/builder/builder.module').then(m => m.BuilderModule) },
  { path: 'fill', canActivate: [AuthGuard], loadChildren: () => import('./components/fill/fill.module').then(m => m.FillModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
