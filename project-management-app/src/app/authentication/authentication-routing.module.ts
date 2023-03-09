import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpPageComponent } from '@authentication/pages/sign-up-page/sign-up-page.component';
import { LoginPageComponent } from '@authentication/pages/login-page/login-page.component';
import { NotFoundPageComponent } from '@core/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'signUp', component: SignUpPageComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AuthenticationRoutingModule {}
