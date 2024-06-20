import { NgModule } from '@angular/core';

import { ArrayFiltroPipe } from './pipes/array-filtro.pipe';
import { FormatPhonePipe } from './pipes/format-phone.pipe';
import { IconColorPipe } from './pipes/icon-color.pipe';
import { IconCustomerPipe } from './pipes/icon-customer.pipe';

@NgModule({
  declarations: [
    ArrayFiltroPipe,
    FormatPhonePipe,
    IconColorPipe,
    IconCustomerPipe,
  ],
  exports: [ArrayFiltroPipe, FormatPhonePipe, IconColorPipe, IconCustomerPipe],
})
export class SharedPipesModule {}
