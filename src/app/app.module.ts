import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  DEFAULT_CURRENCY_CODE,
  Injectable,
  LOCALE_ID,
  NgModule,
  isDevMode,
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

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ServiceWorkerModule } from '@angular/service-worker';
import { authInterceptor } from './interceptors/auth.interceptor';
import { InstallPwaComponentComponent } from './shared/components/install-pwa/install-pwa.component';
import { HttpErrorInterceptor } from './shared/interceptor/error-interceptor.service';

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
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    InstallPwaComponentComponent,
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
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    provideEnvironmentNgxMask(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
