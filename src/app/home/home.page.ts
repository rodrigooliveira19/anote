import { Component } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ComponenteConfigComponent } from '../componente-config/componente-config.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private tituloCor: string = ''; 
  
  private anotacoes: any[] = [];

  constructor(private nativeStorage: NativeStorage, 
              private navCtrl: NavController, 
              private popoverCtrl: PopoverController) {}

  ngOnInit() {
    this.nativeStorage.getItem('anotacoes')
    .then(anotacoesJson => {
      this.anotacoes = JSON.parse(anotacoesJson); 
    })
    .catch(() =>{
      console.log(""+this.anotacoes.length)
    }); 
  }

  buscar(ev: any) {
    this.tituloCor = ev.detail.value; 
  }

  adicionarAnotacao(namePage: string) {
    this.navCtrl.navigateForward(namePage); 
  }

  async abrirConfig(ev: any) {
    let popover = await this.popoverCtrl.create({
      component: ComponenteConfigComponent, 
      event: ev
    }); 

    return await popover.present(); 
  }

}
