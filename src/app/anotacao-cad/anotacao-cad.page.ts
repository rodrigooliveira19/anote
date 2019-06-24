import { Anotacao } from './../model/anotacao';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anotacao-cad',
  templateUrl: './anotacao-cad.page.html',
  styleUrls: ['./anotacao-cad.page.scss'],
})
export class AnotacaoCadPage implements OnInit {

  private anotacao: Anotacao; 

  constructor() { }

  ngOnInit() {
    this.anotacao = new Anotacao(); 
  }

  corAnotcao(cor: string) {
    this.anotacao.cor = cor; 
    console.log(this.anotacao.cor); 
  }

  salvar(){
    alert(this.anotacao.descricao); 
  }

}
