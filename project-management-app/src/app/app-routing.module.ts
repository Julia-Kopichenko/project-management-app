import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from '@core/pages/not-found-page/not-found-page.component';
import { WelcomePageComponent } from '@core/pages/welcome-page/welcome-page.component';
import { EditProfilePageComponent } from '@core/pages/edit-profile-page/edit-profile-page.component';
import { AuthGuard } from './shared/guard/auth.guard';

const appRoutes: Routes = [
  { path: '', component: WelcomePageComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./core/pages/main-page/main-page.module').then(
        (m) => m.MainPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'editProfile',
    component: EditProfilePageComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
