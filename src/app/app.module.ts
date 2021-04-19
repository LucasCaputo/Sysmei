import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import { PrivateComponent } from './views/private/private.component';
import { PublicComponent } from './views/public/public.component';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InterceptorService } from './shared/components/loader/interceptor.service';

import { LoaderComponent } from './shared/components/loader/loader/loader.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PrivateComponent,
    PublicComponent,
    LoaderComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatProgressBarModule,

    SharedModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
