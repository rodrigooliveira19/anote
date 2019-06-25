import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(anotacoes: any[], titulo: string): any[] {
    
    if (titulo === '') {
      return anotacoes;
    }

    titulo = titulo.toLowerCase(); 

    return anotacoes.filter(item=>{
      return item.titulo.toLowerCase()
                  .includes(titulo); 
    }); 
  }

}
