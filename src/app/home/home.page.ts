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
  private configApp: any; 
  
  private anotacoes: any[] = [];
  private categorias: any[] = [];

  constructor(private nativeStorage: NativeStorage, 
              private navCtrl: NavController, 
              private popoverCtrl: PopoverController, 
              private alertCtrl: AlertController, 
              private toastCtrl: ToastController) {}

  ngOnInit() {
    this.loadingConfigApp(); 
    this.loadingCategorias(); 
  }

  ionViewWillEnter(){
    this.loadingConfigApp(); 
    this.loadingCategorias(); 
  }

  buscar(ev: any) {
    this.tituloCor = ev.detail.value;  
  }


  addAnotacao(categoria: Categoria) {
    let id = categoria.id; 
    let index = this.findIndex(id); 
    console.log("AddAnotação: id: "+id + "index: "+index); 
    if (index > -1) {
      this.navCtrl.navigateForward(['/anotacao-list',this.configApp.corDominante,id,index]);
    }
     
  }

  private findIndex(id:number) {
    for (let index = 0; index < this.categorias.length; index++) {
      console.log('não'); 
      if (id === this.categorias[index].id) {
        console.log('sim'); 
        return index; 
      }
    }
    return -1; 
  }

  

   async addCategoria(nomeCategoria: string, cor:string) { 
    let valido = this.validarCategoria(nomeCategoria,cor); 
    if (valido === 1) {
      cor = this.validarCorCategoria(cor); 
      let categoria = new Categoria(); 
      this.configApp.idCategoria = this.configApp.idCategoria + 1; 
      categoria.id = this.configApp.idCategoria; 
      categoria.titulo = nomeCategoria; 
      categoria.cor = cor; 
      this.categorias.push(categoria); 
      this.updateNativeStorageCategoria(); 

    }else{
      const toast = await this.toastCtrl.create({
        message: 'Verificar dados',
        duration: 1500,
        position: 'top'
      });
      toast.present();
    }

  }

  excluirCategoria(categoria: Categoria) {
  }

   validarCategoria(categoria: string, cor:string){
    if (categoria.trim().length < 1 ||  cor.trim().length < 1 || !categoria ){
      return 0;
    }
    return 1; 
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

  async abrirConfig() {
    this.navCtrl.navigateForward('/config-page'); 
    /*
    ev: any
    let popover = await this.popoverCtrl.create({
      component: ComponenteConfigComponent, 
      event: ev
    }); 
    return await popover.present(); 
    */
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
    console.log("Entrei no loadingCategorias"); 
    this.nativeStorage.getItem('categorias')
    .then(categoriasJson => {
      if (categoriasJson != null) {
        this.categorias = JSON.parse(categoriasJson); 
      }
    })
    .catch(() =>{
    }); 
  }


  async loadingConfigApp() {
    console.log("Entrei no loadingConfigApp"); 
    this.configApp = new ConfigApp(); 
    console.log("corDominante: "+this.configApp.corDominante); 
    this.nativeStorage.getItem('config')
    .then(configJson => {
      if (configJson != null) {
        this.configApp = JSON.parse(configJson); 
      }
    })
    .catch(() =>{
    }); 
  }

  updateConfig() {
    this.nativeStorage.setItem('config',JSON.stringify(this.configApp)); 
  }

  updateNativeStorageCategoria() {
    this.nativeStorage.setItem('categorias',JSON.stringify(this.categorias))
    .then((e)=>{
      this.updateConfig(); 
    })
    .catch((e)=>{
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
