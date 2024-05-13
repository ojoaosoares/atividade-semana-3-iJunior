"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readCVS = require('../model/readCVS');
const produto_1 = require("../classes/produto");
function criarDatabase() {
    readCVS.criarArquivos();
}
function adicionarItem(nome, peso, valor, quantidade) {
    try {
        let index = readCVS.retornarIndex();
        while (readCVS.indexExiste(index))
            index++;
        let produto = new produto_1.Produto(index, nome, peso, valor, quantidade);
        readCVS.inserirLinha(produto);
        readCVS.atualizarIndex(index + 1);
    }
    catch (error) {
        throw error;
    }
}
function removerItem(index) {
    try {
        readCVS.removerLinha(index);
    }
    catch (error) {
        throw error;
    }
}
function listarItens() {
    let itens;
    try {
        itens = readCVS.retornarItens();
    }
    catch (error) {
        throw error;
    }
    console.log("INDEX - NOME - PESO - VALOR - QUANTIDADE");
    itens.forEach(element => {
        element.imprimir();
    });
}
function retornarValorTotal() {
    let valor_total;
    try {
        valor_total = readCVS.retornarItens().reduce((acumulador, valorAtual) => {
            return acumulador + (valorAtual.quantidade * valorAtual.valor);
        }, 0);
    }
    catch (error) {
        throw error;
    }
    return valor_total;
}
function retornarPesoTotal() {
    let peso_total;
    try {
        peso_total = readCVS.retornarItens().reduce((acumulador, valorAtual) => {
            return acumulador + (valorAtual.quantidade * valorAtual.peso);
        }, 0);
    }
    catch (error) {
        throw error;
    }
    return peso_total;
}
function retornarQuantidadeTotal() {
    let quantidade_total;
    try {
        quantidade_total = readCVS.retornarItens().reduce((acumulador, valorAtual) => {
            return acumulador + valorAtual.quantidade;
        }, 0);
    }
    catch (error) {
        throw error;
    }
    return quantidade_total;
}
function retornarQuantidadeUnica() {
    let quantidade_unica;
    try {
        let itens = readCVS.retornarItens();
        quantidade_unica = itens.length;
    }
    catch (error) {
        throw error;
    }
    return quantidade_unica;
}
function retornarMediaValor() {
    let media_valor;
    try {
        media_valor = retornarValorTotal() / retornarQuantidadeTotal();
    }
    catch (error) {
        throw error;
    }
    return media_valor;
}
function retornarMediaPeso() {
    let media_peso;
    try {
        media_peso = retornarPesoTotal() / retornarQuantidadeTotal();
    }
    catch (error) {
        throw error;
    }
    return media_peso;
}
module.exports = { adicionarItem, removerItem, listarItens, retornarValorTotal,
    retornarPesoTotal, retornarQuantidadeTotal, retornarQuantidadeUnica,
    retornarMediaValor, retornarMediaPeso, criarDatabase };
//# sourceMappingURL=controleEstoque.js.map