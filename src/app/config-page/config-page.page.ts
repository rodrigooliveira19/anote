import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.page.html',
  styleUrls: ['./config-page.page.scss'],
})
export class ConfigPagePage implements OnInit {

  private opcao: string= "dark"; 

  constructor() { }

  ngOnInit() {
  }

  click(cor: string) {
    this.opcao = cor; 
    console.log(this.opcao); 
  }

}
