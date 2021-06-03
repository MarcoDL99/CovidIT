import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraficiPage } from './grafici.page';

const routes: Routes = [
  {
    path: '',
    component: GraficiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraficiPageRoutingModule {}
