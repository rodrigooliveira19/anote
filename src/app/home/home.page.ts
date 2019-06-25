import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private tituloCor: string = ''; 
  
  private anotacoes: any[] = [];

  constructor(private nativeStorage: NativeStorage, 
              private navCtrl: NavController) {}

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

}
