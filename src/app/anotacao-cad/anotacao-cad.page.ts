import { Anotacao } from './../model/anotacao';
import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ToastController } from '@ionic/angular';

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

  private anotacoes: any[] = []; 


  constructor(private nativeStorage: NativeStorage, 
              private toastCtrl: ToastController) { }

  ngOnInit() {
    //this.anotacao = new Anotacao();
    this.loadingCards();     
  }

  corAnotacao(cor: string) {
    this.cor = cor; 
    //console.log(this.anotacao.cor); 
  }

  salvar(){
    if (this.validar()) {
      this.add(); 
      this.updateNativeStorage(); 
    }
    
  }

  async validar() {
    if(!this.titulo || !this.descricao) {
      let toast = await this.toastCtrl.create({
        message :'Cadastrar Título e descrição',
        duration: 3000, 
        color: 'danger', 
        position : 'top'
      }); 

      toast.present(); 
      return false; 
    }else {
      return true; 
    }
  }

  add() {
    if (this.titulo.trim().length > 0  && this.descricao.trim().length > 0) {
        let anotacao = new Anotacao(); 
        anotacao.titulo = this.titulo; 
        anotacao.descricao = this.descricao; 
        anotacao.cor = this.cor; 

        this.anotacoes.push(anotacao); 
        console.log(this.anotacoes); 
    }
  }

  updateNativeStorage() {
    this.nativeStorage.setItem('anotacoes',JSON.stringify(this.anotacoes)); 
  }

  buscar(ev: any) {
    this.tituloCor = ev.detail.value; 
    console.log(this.tituloCor); 
  }

  loadingCards(){
    this.nativeStorage.getItem('anotacoes')
    .then(anotacoesJson => {
      this.anotacoes = JSON.parse(anotacoesJson); 
      console.log(this.anotacoes);  
      console.log("recarrregando"); 
    })
    .catch(() =>{
      console.log(""+this.anotacoes.length)
    }); 
    
  }

}
