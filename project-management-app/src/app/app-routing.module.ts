import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpPageComponent } from './authentication/pages/sign-up-page/sign-up-page.component';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { WelcomePageComponent } from './core/pages/welcome-page/welcome-page.component';

const appRoutes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'auth/signup', component: SignUpPageComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
