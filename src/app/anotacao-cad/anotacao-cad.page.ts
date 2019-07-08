import { Anotacao } from './../model/anotacao';
import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ToastController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anotacao-cad',
  templateUrl: './anotacao-cad.page.html',
  styleUrls: ['./anotacao-cad.page.scss'],
})
export class AnotacaoCadPage implements OnInit {

  private titulo: string; 
  private descricao: string; 
  private cor: string; 

  private tituloCor: string = "";
  private index: number; 
  private idCategoria: number; 
  private corDominante: string; 

  private anotacoes: any[] = [];
  private categorias: any[] = []; 


  constructor(private activRoute: ActivatedRoute,
              private nativeStorage: NativeStorage, 
              private toastCtrl: ToastController, 
              private navCtrl: NavController) { }

  ngOnInit() {
    this.corDominante = this.activRoute.snapshot.paramMap.get('corDominante'); 
    this.idCategoria = Number(this.activRoute.snapshot.paramMap.get('id')); 
    this.index = Number(this.activRoute.snapshot.paramMap.get('index')); 
    this.loadingCategorias(); 
      
  }

  async corAnotacao(cor: string) {
    this.cor = cor; 
    if(cor === 'success') {
      cor = 'verde'; 
    }else if (cor === 'secondary' ) {
      cor = 'azul claro'; 
    }else if (cor === 'dark' ) {
      cor = 'preto'; 
    }else if (cor === 'tertiary') {
      cor = 'terciária'; 
    }else if (cor === 'warning' ) {
      cor =  'amarelo'; 
    }else if (cor === 'danger' ) {
      cor = 'vermelho'; 
    }else if (cor === 'light' ) {
      cor = 'leve'; 
    }else if (cor === 'medium') {
      cor = 'médio'; 
    }
    const toast = await this.toastCtrl.create({
      message: 'Card '+cor+' selecionado',
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  async salvar(){
    if (this.validar() === 1) {
      this.add(); 
      this.updateNativeStorage(); 
    }else {
      let toast = await this.toastCtrl.create({
        message :'Cadastrar Título e descrição',
        duration: 3000, 
        color: 'danger', 
        position : 'top'
      }); 
      toast.present(); 
    }
  }

  validar() {
    if(!this.titulo || !this.descricao) {
      return 0; 
    }else {
      return 1; 
    }
  }

  add() {
    if (this.titulo.trim().length > 0  && this.descricao.trim().length > 0) {
        let anotacao = new Anotacao(); 
        anotacao.titulo = this.titulo; 
        anotacao.descricao = this.descricao; 
        anotacao.cor = this.cor; 

        let size = this.categorias[this.index].anotacao.lenght; 
        this.categorias[this.index].anotacao.push(anotacao);
        if((size + 1) == this.categorias[this.index].anotacao.lenght) {
          alert('Anotação adicionada na categoria id: '+this.categorias[this.index].id + 'size: '
          +this.categorias[this.index].anotacao.lenght); 
        }
        
    }
  }

  updateNativeStorage() {
    this.nativeStorage.setItem('categorias',JSON.stringify(this.categorias))
    .then(()=>{
      this.navCtrl.navigateForward(['anotacao-list',this.corDominante,this.idCategoria,this.index]);
    })
    .catch(); 
  }

  buscar(ev: any) {
    this.tituloCor = ev.detail.value; 
    console.log(this.tituloCor); 
  }

  loadingCategorias() {
    this.nativeStorage.getItem('categorias')
    .then(categoriasJson => {
      if (categoriasJson != null) {
        this.categorias = JSON.parse(categoriasJson); 
        alert("carreguei as categorias"); 
      }
    })
    .catch(() =>{
      alert("Erro não encontrei as categorias"); 
    }); 
  }

}
