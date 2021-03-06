import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  { path: 'home', 
    loadChildren: './home/home.module#HomePageModule' },

  { path: 'anotacao-cad/:corDominante/:id/:index', 
    loadChildren: './anotacao-cad/anotacao-cad.module#AnotacaoCadPageModule' },
  
  { path: 'anotacao-cad/:corDominante/:id/:index/:indexAnotacao', 
    loadChildren: './anotacao-cad/anotacao-cad.module#AnotacaoCadPageModule' },

  { path: 'config-page', 
    loadChildren: './config-page/config-page.module#ConfigPagePageModule' },

  { path: 'anotacao-list/:corDominante/:id/:index', 
    loadChildren: './anotacao-list/anotacao-list.module#AnotacaoListPageModule' }, 
  
  
    

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
