import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItalyPageRoutingModule } from './italy-routing.module';

import { ItalyPage } from './italy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItalyPageRoutingModule
  ],
  declarations: [ItalyPage],
})
export class ItalyPageModule {}
