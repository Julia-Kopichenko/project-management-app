import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpPageComponent } from '@authentication/pages/sign-up-page/sign-up-page.component';
import { AuthenticationService } from '@authentication/services/authentication.service';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [SignUpPageComponent],
  imports: [CommonModule, SharedModule],
  providers: [AuthenticationService],
  exports: [SignUpPageComponent],
})

export class AuthenticationModule {}
