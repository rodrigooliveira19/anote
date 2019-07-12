import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Platform, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ConfigApp } from '../model/config';

@Component({
  selector: 'app-componente-config',
  templateUrl: './componente-config.component.html',
  styleUrls: ['./componente-config.component.scss'],
})
export class ComponenteConfigComponent implements OnInit {
  
  platform: Platform; 
  private configApp: any; 

  constructor(private nativeStorage: NativeStorage, 
              private navCtrl: NavController) {}

  ngOnInit() {
    this.loadingConfigApp(); 
  }


  abrirConfig(namePage: string) {
    this.navCtrl.navigateForward(namePage); 
    //console.log('Abrir configue'); 
  }

  sair() {  
    console.log('Sair'); 
  }


  loadingConfigApp() {
    this.configApp = new ConfigApp(); 
    this.nativeStorage.getItem('config')
    .then(configJson => {
      if (configJson != null) {
        this.configApp = JSON.parse(configJson); 
        alert('Encontrei o config: idCategoria: '+this.configApp.idCategoria); 
      }
    })
    .catch(() =>{
      alert('Não encontrei o config'); 
    }); 
  }

  updateConfig() {
    this.nativeStorage.setItem('config',JSON.stringify(this.configApp)); 
    alert('Salvando o config'); 
  }

}
