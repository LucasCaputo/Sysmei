import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  DEFAULT_CURRENCY_CODE,
  Injectable,
  LOCALE_ID,
  NgModule,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatToolbarModule } from '@angular/material/toolbar';

import { InterceptorService } from './shared/components/loader/interceptor.service';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { LoaderComponent } from './shared/components/loader/loader/loader.component';
import { HttpErrorInterceptor } from './shared/interceptor/error-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { provideEnvironmentNgxMask } from 'ngx-mask';

// import { HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
// import * as Hammer from 'hammerjs';

@Injectable()
// export class MyHammerConfig extends HammerGestureConfig {
//   override = {
//     swipe: { direction: Hammer.DIRECTION_ALL },
//   };
// }

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatProgressBarModule,
    SharedModule,
    FormsModule,
    LoaderComponent,
    // HammerModule
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
    // {
    //   provide: HAMMER_GESTURE_CONFIG,
    //   useClass: MyHammerConfig,
    // }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
