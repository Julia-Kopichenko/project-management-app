import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpPageComponent } from '@authentication/pages/sign-up-page/sign-up-page.component';
import { LoginPageComponent } from '@authentication/pages/login-page/login-page.component';

import { SharedModule } from '@shared/shared.module';
import { AuthenticationRoutingModule } from '@authentication/authentication-routing.module';

@NgModule({
  declarations: [SignUpPageComponent, LoginPageComponent],
  imports: [CommonModule, SharedModule, AuthenticationRoutingModule],
  providers: [],
})
export class AuthenticationModule {}
