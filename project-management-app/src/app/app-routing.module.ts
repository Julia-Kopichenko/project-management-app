import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';

const appRoutes: Routes = [
  // { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '', component: WelcomePageComponent },
  { path: 'auth/signup', component: AuthPageComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
