import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'italy',
    pathMatch: 'full'
  },
  {
    path: 'italy',
    loadChildren: () => import('./pages/italy/italy.module').then( m => m.ItalyPageModule)
  },
  {
    path: 'region',
    loadChildren: () => import('./pages/region/region.module').then( m => m.RegionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
