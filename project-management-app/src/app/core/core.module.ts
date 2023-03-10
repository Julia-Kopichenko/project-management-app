import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@core/components/header/header.component';
import { FooterComponent } from '@core/components/footer/footer.component';
import { SharedModule } from '@shared/shared.module';
import { WelcomePageComponent } from '@core/pages/welcome-page/welcome-page.component';
import { NotFoundPageComponent } from '@core/pages/not-found-page/not-found-page.component';
import { CoreRoutingModule } from '@core/core-routing.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    WelcomePageComponent,
    NotFoundPageComponent,
  ],
  imports: [CommonModule, CoreRoutingModule, SharedModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    WelcomePageComponent,
    NotFoundPageComponent,
  ],
})
export class CoreModule {}
