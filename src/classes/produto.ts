export class Produto {

    index : number;
    nome : string;
    valor : number;
    peso : number;
    quantidade : number
    
    constructor(index : number, nome : string, 
    peso : number, valor : number,  quantidade : number)
    {
        this.index = index;
        this.nome = nome;
        this.valor = valor;
        this.peso = peso;
        this.quantidade = quantidade
    };

    imprimir() : void {
        console.log(`${this.index} ${this.nome} ${this.peso}Kg R$${this.valor} ${this.quantidade} unidades`);  
    }
};
