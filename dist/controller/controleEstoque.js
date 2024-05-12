"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readCVS = require('../model/readCVS');
const produto_1 = require("../classes/produto");
// function adicionarItem(index : number, nome : string, peso : number,
// valor : number, quantidade : number) {
//     return new Promise ((resolve : any, reject : any) => {
//         let produto = new Produto(index, nome, peso, valor, quantidade);
//         readCVS.inserirLinha(produto)
//             .then((result) => {
//                 resolve(result)
//             }).catch((err) => {
//                 reject(err);
//             });
//     })
// }
function adicionarItem(index, nome, peso, valor, quantidade) {
    let produto = new produto_1.Produto(index, nome, peso, valor, quantidade);
    try {
        readCVS.inserirLinha(produto);
    }
    catch (error) {
        console.log(error);
    }
}
function removerItem(index) {
    try {
        readCVS.removerLinha(index);
    }
    catch (error) {
        console.log(error);
    }
}
function listarItens() {
    let itens = readCVS.retornarItens();
    console.log("INDEX - NOME - PESO - VALOR - QUANTIDADE");
    itens.forEach(element => {
        element.imprimir();
    });
}
function retornarValorTotal() {
    return readCVS.retornarItens().reduce((acumulador, valorAtual) => {
        return acumulador + (valorAtual.quantidade * valorAtual.valor);
    }, 0);
}
function retornarPesoTotal() {
    return readCVS.retornarItens().reduce((acumulador, valorAtual) => {
        return acumulador + (valorAtual.quantidade * valorAtual.peso);
    }, 0);
}
console.log(retornarValorTotal());
console.log(retornarPesoTotal());
//# sourceMappingURL=controleEstoque.js.map