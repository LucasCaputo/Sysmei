/// <reference types="@angular/localize" />

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/service-worker.js')
//       .then((registration) => {
//         console.log('Service Worker registrado com sucesso:', registration);
//       })
//       .catch((error) => {
//         console.error('Falha ao registrar o Service Worker:', error);
//       });
//   });
// }

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
