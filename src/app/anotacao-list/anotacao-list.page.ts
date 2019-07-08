import { Anotacao } from './../model/anotacao';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../model/categoria';

@Component({
  selector: 'app-anotacao-list',
  templateUrl: './anotacao-list.page.html',
  styleUrls: ['./anotacao-list.page.scss'],
})
export class AnotacaoListPage implements OnInit {

  private categorias: any[] = [];
  //private anotacoes: any[] = [];
  private tituloCor: string ="";

  private corDominante: string;
  private index: number; 
  private idCategoria: number; 

  constructor(private activRoute: ActivatedRoute,
              private navCtrl: NavController,
              private nativeStorage: NativeStorage) { }

  ngOnInit() {
    this.corDominante = this.activRoute.snapshot.paramMap.get('corDominante'); 
    this.index = Number(this.activRoute.snapshot.paramMap.get('index')); 
    this.idCategoria = Number(this.activRoute.snapshot.paramMap.get('id')); 
    this.loadingCategorias(); 
  }

  buscar(ev: any) {
    this.tituloCor = ev.detail.value; 
  }

  navegar() {
    this.navCtrl.navigateForward(['/anotacao-cad',this.corDominante,this.idCategoria,this.index]); 
  }

  navegarHome(namePage: string) {
    this.navCtrl.navigateForward(namePage); 
  }

  loadingCategorias() {
    this.nativeStorage.getItem('categorias')
    .then(categoriasJson => {
      if (categoriasJson != null) {
        this.categorias = JSON.parse(categoriasJson); 
        alert("Carreguei as categorias"); 

      }
     /* if (this.categorias[this.index].id === this.idCategoria){
        this.anotacoes.push(this.categorias[this.index].anotacao); 
      }*/
    })
    .catch(() =>{
      alert("Erro não carreguei as categorias");
    }); 
  }


  r(){
    console.log("Exluir tudo"); 
  }

  

}
