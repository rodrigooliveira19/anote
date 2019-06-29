import { ConfigApp } from './../model/config';
import { Component, Input } from '@angular/core';
import { NavController, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ComponenteConfigComponent } from '../componente-config/componente-config.component';
import { Categoria } from '../model/categoria';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private tituloCor: string ="";
  private configApp: ConfigApp; 
  
  private anotacoes: any[] = [];
  private categorias: any[] = [];

  constructor(private nativeStorage: NativeStorage, 
              private navCtrl: NavController, 
              private popoverCtrl: PopoverController, 
              private alertCtrl: AlertController, 
              private toastCtrl: ToastController) {}

  ngOnInit() {
    this.configApp = new ConfigApp(); 
    this.loadingConfigApp(); 
    //this.loadingCards(); 
    this.loadingCategorias(); 
  }

  buscar(ev: any) {
    this.tituloCor = ev.detail.value; 
    console.log(this.tituloCor); 
  }

  addAnotacao(namePage: string) {
    this.navCtrl.navigateForward(namePage); 
  }

  addCategoria(nomeCategoria: string, cor:string) { 
    if (this.validarCategoria(nomeCategoria,cor)) { 
      cor = this.validarCorCategoria(cor); 
      let categoria = new Categoria(); 
      categoria.titulo = nomeCategoria; 
      categoria.cor = cor; 
      console.log(categoria.titulo); 
      console.log(categoria.cor); 
      this.categorias.push(categoria); 
      this.updateNativeStorageCategoria(); 
    }

  }

  async validarCategoria(categoria: string, cor:string) {
    if (categoria.trim().length < 1 ||  cor.trim().length < 1 || !categoria ){
      const toast = await this.toastCtrl.create({
        message: 'Verificar dados',
        duration: 2000,
        position: 'top'
      });

      toast.present();
      console.log("passei aq"); 
      return false;
    }

    console.log("passei aq 2"); 
    return true; 
  }

  validarCorCategoria(cor:string) {
    cor = cor.toLowerCase();
    if (cor.trim().length >= 4) {
      if(cor === 'verde') {
        return 'success'; 
      }else if (cor === 'azul' ) {
        return 'primary'; 
      }else if (cor === 'terciaria' || cor === 'terciária') {
        return 'tertiary'; 
      }else if (cor === 'amarelo' ) {
        return 'warning'; 
      }else if (cor === 'vermelho' ) {
        return 'danger'; 
      }else if (cor === 'leve' ) {
        return 'ligth'; 
      }else if (cor === 'medio' || cor ==='médio') {
        return 'medium'; 
      }
    }

    return 'dark'; 

  }

  async abrirConfig(ev: any) {
    let popover = await this.popoverCtrl.create({
      component: ComponenteConfigComponent, 
      event: ev
    }); 

    return await popover.present(); 
  }

  loadingCards() {
    this.nativeStorage.getItem('anotacoes')
    .then(anotacoesJson => {
      this.anotacoes = JSON.parse(anotacoesJson); 
    })
    .catch(() =>{
      console.log("home page "+this.anotacoes.length)
    }); 
  }

  loadingCategorias() {
    this.nativeStorage.getItem('categorias')
    .then(categoriasJson => {
      this.categorias = JSON.parse(categoriasJson); 
    })
    .catch(() =>{
      console.log("home page "+this.categorias.length)
    }); 
  }

  loadingConfigApp() {
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

  updateNativeStorageCategoria() {
    this.nativeStorage.setItem('categorias',JSON.stringify(this.categorias))
    .then((e)=>{
      console.log("Salvado categoria"+e); 
    })
    .catch((e)=>{
      console.log("Erro"+e); 
    }); 
  }

  async newCategoria() {
    let alert =  await this.alertCtrl.create({
      header: 'Nova Categoria', 
      subHeader: 'Informe a categoria e escolha uma das cores abaixo:  ',
      message: 'verde, azul, terciária, preto, amarelo, vermelho,  leve, médio', 
      inputs: [
        {
          name: 'categoria', 
          type: 'text', 
          placeholder: 'Categoria'

        }, 
        {
          name: 'cor', 
          type: 'text', 
          placeholder: 'Cor'

        }
      
      ], 
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('cancelar');
          }
        },
        {
          text: 'Adicionar',
          handler: data => {
           this.addCategoria(data.categoria,data.cor); 
          }
        }
      ]

    
       
    }); 

    alert.present(); 
  }

}
