import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {ItalyPage} from './pages/italy/italy.page';
import {RegionPage} from './pages/region/region.page';
import {ContactsPage} from './pages/contacts/contacts.page';
import {FaqPage} from './pages/faq/faq.page';
import {ProvincePage} from './pages/province/province.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'italy',
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
    path: 'splash-screen',
    loadChildren: () => import('./pages/splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'popovermenu',
    loadChildren: () => import('./pages/popovermenu/popovermenu.module').then(m => m.PopovermenuPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
