import { Anotacao } from './anotacao';

export class Categoria {
    
    public titulo: string; 
    public cor: string; 
    private _anotacao: Anotacao[]; 

    public get anotacao(): Anotacao[] {
        return this._anotacao;
    }
    public set anotacao(value: Anotacao[]) {
        this._anotacao = value;
    }

}