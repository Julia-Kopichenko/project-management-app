import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SignUpPageComponent],
  imports: [CommonModule, SharedModule],
  exports: [SignUpPageComponent],
})

export class AuthenticationModule {}
