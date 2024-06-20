import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  DEFAULT_CURRENCY_CODE,
  Injectable,
  LOCALE_ID,
  NgModule,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InterceptorService } from './shared/components/loader/interceptor.service';

import { BrowserModule } from '@angular/platform-browser';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { LoaderComponent } from './shared/components/loader/loader/loader.component';
import { HttpErrorInterceptor } from './shared/interceptor/error-interceptor.service';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

// Registre a localidade para 'pt'
registerLocaleData(localePt, 'pt');

@Injectable()
@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    LoaderComponent,
    HttpClientModule,
    MatSnackBarModule,
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
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    provideEnvironmentNgxMask(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
