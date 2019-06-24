import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AnotacaoCadPage } from './anotacao-cad.page';

const routes: Routes = [
  {
    path: '',
    component: AnotacaoCadPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AnotacaoCadPage]
})
export class AnotacaoCadPageModule {}
