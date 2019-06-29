import { ConfigApp } from './../model/config';
import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.page.html',
  styleUrls: ['./config-page.page.scss'],
})
export class ConfigPagePage implements OnInit {

  private configApp: ConfigApp; 

  constructor(private nativeStorage: NativeStorage, 
              private toastCtrl: ToastController) { }

  ngOnInit() {
    this.loadingConfigApp(); 
  }

  
  setCorDominante(cor: string) {
    this.configApp.corDominante = cor; 
    console.log(this.configApp.corDominante); 
  } 

  loadingConfigApp() {
    this.configApp = new ConfigApp(); 
    this.nativeStorage.getItem('config')
    .then(config => {
      if (config != null ) {
        this.configApp = JSON.parse(config);
      }
    })
    .catch(() =>{
      console.log("Erro ao buscar config app")
    }); 
  }

  async updateConfig() {
    let toast =  await this.toastCtrl.create({
      message: 'Salvando configuração',
      duration: 2000, 
      color: 'success', 
      position: 'top', 
    }); 

    this.nativeStorage.setItem('config',JSON.stringify(this.configApp)); 
    toast.present(); 
    
  }

}
