import { Anotacao } from './../model/anotacao';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-anotacao-list',
  templateUrl: './anotacao-list.page.html',
  styleUrls: ['./anotacao-list.page.scss'],
})
export class AnotacaoListPage implements OnInit {

  private categorias: any[] = [];
  private tituloCor: string ="";

  private corDominante: string;
  private index: number; 
  private idCategoria: number; 

  private sizeBoolean: boolean = false; 

  constructor(private activRoute: ActivatedRoute,
              private navCtrl: NavController,
              private nativeStorage: NativeStorage, 
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.corDominante = this.activRoute.snapshot.paramMap.get('corDominante'); 
    this.index = Number(this.activRoute.snapshot.paramMap.get('index')); 
    this.idCategoria = Number(this.activRoute.snapshot.paramMap.get('id')); 

    this.loadingCategorias(); 
  }

  ionViewWillEnter(){
    this.loadingCategorias(); 
    
  }

  buscar(ev: any) {
    this.tituloCor = ev.detail.value; 
  }

  navegar() {
    this.navCtrl.navigateForward(['/anotacao-cad',this.corDominante,this.idCategoria,this.index]); 
   
  }

  editarAnotacao(anotacao: any) {
    let indexAnotacao = this.categorias[this.index].anotacao.indexOf(anotacao); 
    this.navCtrl.navigateForward(['/anotacao-cad',this.corDominante,this.idCategoria,this.index,indexAnotacao]); 
  }

  navegarHome(namePage: string) {
    this.navCtrl.navigateForward(namePage); 
  }

  loadingCategorias() {
    this.nativeStorage.getItem('categorias')
    .then(categoriasJson => {
      if (categoriasJson != null) {
        this.categorias = JSON.parse(categoriasJson);
        
        if (this.categorias.length > 0) {
          this.sizeBoolean = true; 
        }else {
          this.sizeBoolean = false;
        }
      }
    })
    .catch(() =>{
    }); 
  }

  updateNativeStorageCategoria() {
    this.nativeStorage.setItem('categorias',JSON.stringify(this.categorias))
    .then((e)=>{
    })
    .catch((e)=>{
    }); 
  }


  async excluirCategoria(){
    let alert = await this.alertCtrl.create({
      header: 'Confirmação', 
      message: 'Deseja excluir a categoria: '+ this.categorias[this.index].titulo + ' ?', 
      buttons:[
        {
          text:'Cancelar', 
          role: 'cancel',
          cssClass: 'secondary',
          handler: ()=>{
            console.log('Cancelar'); 
          }
        },
        {
          text:'Confirmar', 
          cssClass: 'secondary',
          handler: ()=>{
            this.categorias.splice(this.index, 1);
            this.updateNativeStorageCategoria(); 
            this.navCtrl.navigateForward('/home'); 
          }
        }
      ]
    }); 

    await alert.present(); 
  }

  

}
