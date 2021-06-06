import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {ItalyPage} from './pages/italy/italy.page';
import {RegionPage} from './pages/region/region.page';
import {ContactsPage} from './pages/contacts/contacts.page';
import {FaqPage} from './pages/faq/faq.page';
import {ProvincePage} from './pages/province/province.page';
import {GraficiPage} from './pages/grafici/grafici.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full'
  },
  {
    path: 'italy',
    loadChildren: () => import('./pages/italy/italy.module').then( m => m.ItalyPageModule),
    component: ItalyPage
  },
  {
    path: 'region',
    loadChildren: () => import('./pages/region/region.module').then( m => m.RegionPageModule),
    component: RegionPage
  },
  {
    path: 'contacts',
    loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsPageModule),
    component: ContactsPage
  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/faq/faq.module').then( m => m.FaqPageModule),
    component: FaqPage
  },
  {
    path: 'province',
    loadChildren: () => import('./pages/province/province.module').then( m => m.ProvincePageModule),
    component: ProvincePage
  },
  {
    path: 'popovermenu',
    loadChildren: () => import('./Utilty/popovermenu/popovermenu.module').then(m => m.PopovermenuPageModule)
  },
  {
    path: 'grafici',
    loadChildren: () => import('./pages/grafici/grafici.module').then(m => m.GraficiPageModule),
    component: GraficiPage
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
