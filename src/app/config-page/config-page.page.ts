import { ConfigApp } from './../model/config';
import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.page.html',
  styleUrls: ['./config-page.page.scss'],
})
export class ConfigPagePage implements OnInit {

  public configApp: ConfigApp; 

  constructor(private nativeStorage: NativeStorage, 
              private navCtrl: NavController, 
              private toastCtrl: ToastController) { }

  ngOnInit() {
    this.loadingConfigApp(); 
    
  }

  
  setCorDominante(cor: string) {
    this.configApp.corDominante = cor; 
  } 

  setCorFundo(cor: string) {
    this.configApp.corDeFundo = cor; 
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
    this.nativeStorage.setItem('config',JSON.stringify(this.configApp))
    .then(()=>{
      this.navCtrl.navigateForward('/home');
    })
    .catch(()=>{
      alert('Não foi possível salvar a configuração'); 
    }); 
    
    
  } 

}
