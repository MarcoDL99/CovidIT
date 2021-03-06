import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GraficiPageRoutingModule } from './grafici-routing.module';
import { GraficiPage } from './grafici.page';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraficiPageRoutingModule,
    Ng2GoogleChartsModule
  ],
  declarations: [GraficiPage]
})
export class GraficiPageModule {}
