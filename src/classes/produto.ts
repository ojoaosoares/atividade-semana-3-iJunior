export class Produto {

    index : number;
    nome : string;
    preco : number;
    peso : number;
    quantidade : number
    
    constructor(index : number, nome : string, 
    peso : number, preco : number,  quantidade : number)
    {
        this.index = index;
        this.nome = nome;
        this.preco = preco;
        this.peso = peso;
        this.quantidade = quantidade
    };
};
