import { Media } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AnotacaoCadPage } from './anotacao-cad.page';
import { PipesModule } from '../pipes/pipes.module';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


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
    PipesModule, 
    RouterModule.forChild(routes)
  ],
  providers: [
    MediaCapture, 
    Camera, 
    Media, 
    File], 
  declarations: [AnotacaoCadPage]
})
export class AnotacaoCadPageModule {}
