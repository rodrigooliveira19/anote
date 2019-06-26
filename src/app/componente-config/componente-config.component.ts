import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Platform, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-componente-config',
  templateUrl: './componente-config.component.html',
  styleUrls: ['./componente-config.component.scss'],
})
export class ComponenteConfigComponent implements OnInit {
  
  platform: Platform; 

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}


  abrirConfig(namePage: string) {
    this.navCtrl.navigateForward(namePage); 
    //console.log('Abrir configue'); 
  }

  sair() {  
    console.log('Sair'); 
  }

}
