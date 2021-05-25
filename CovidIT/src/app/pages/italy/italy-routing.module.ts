import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItalyPage } from './italy.page';

const routes: Routes = [
  {
    path: '',
    component: ItalyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItalyPageRoutingModule {}
