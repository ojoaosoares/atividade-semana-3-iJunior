"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Produto = void 0;
class Produto {
    constructor(index, nome, peso, valor, quantidade) {
        this.index = index;
        this.nome = nome;
        this.valor = valor;
        this.peso = peso;
        this.quantidade = quantidade;
    }
    ;
    imprimir() {
        console.log(`${this.index} ${this.nome} ${this.index} ${this.peso} ${this.valor} ${this.quantidade}`);
    }
}
exports.Produto = Produto;
;
//# sourceMappingURL=produto.js.map