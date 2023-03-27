import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from '@core/pages/not-found-page/not-found-page.component';
import { WelcomePageComponent } from '@core/pages/welcome-page/welcome-page.component';
import { EditProfilePageComponent } from '@core/pages/edit-profile-page/edit-profile-page.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { GuestGuard } from './shared/guard/guest.guard';
import { RoutesPath } from './shared/models/enams/routes-path';

const appRoutes: Routes = [
  { path: '', component: WelcomePageComponent, canActivate: [GuestGuard] },
  {
    path: RoutesPath.authPage,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: RoutesPath.mainPage,
    loadChildren: () =>
      import('./core/pages/main-page/main-page.module').then(
        (m) => m.MainPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: RoutesPath.editProfilePage,
    component: EditProfilePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: RoutesPath.boardPage,
    loadChildren: () =>
      import('./core/pages/board-page/board-page.module').then(
        (m) => m.BoardPageModule
      ),
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
