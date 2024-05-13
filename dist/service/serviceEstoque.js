"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controle = require('../controller/controleEstoque');
const readLine = require('readline-sync');
function criarEstoque() {
    controle.criarDatabase();
    console.log("Arquivos necessarios lidos/criados");
}
function lerItem() {
    console.log("Cadastrando item");
    let nome, peso_s, medida, valor_s, quantidade_s;
    while (true) {
        nome = readLine.question("Nome: ").trim();
        if (nome.toUpperCase() == "CANCEL")
            return;
        else if (nome === '') {
            console.log("Digite algo, tente novamente");
            console.log("Se deseja parar digite: CANCEL");
        }
        else
            break;
    }
    while (true) {
        medida = readLine.question("Em que medida você ira cadastrar (KG, g, CANCEL): ").trim();
        if (medida.toUpperCase() == "CANCEL")
            return;
        else if (medida === '') {
            console.log("Digite algo, tente novamente");
            console.log("Se deseja parar digite: CANCEL");
        }
        else if (medida.toUpperCase() != "KG" && medida.toUpperCase() != "G") {
            console.log("Opção invalida, tente novamente");
            console.log("Se deseja parar digite: CANCEL");
        }
        else
            break;
    }
    while (true) {
        peso_s = readLine.question(`Peso (${medida.toUpperCase()}):`).trim();
        if (peso_s.toUpperCase() == "CANCEL")
            return;
        else if (peso_s === '') {
            console.log("Digite algo, tente novamente");
            console.log("Se deseja parar digite: CANCEL");
        }
        else if (isNaN(peso_s)) {
            console.log("A entrada digitada não é um número, tente novamente");
            console.log("Se deseja parar digite: CANCEL");
        }
        else
            break;
    }
    while (true) {
        valor_s = readLine.question("Valor R$: ").trim();
        if (valor_s.toUpperCase() == "CANCEL")
            return;
        else if (valor_s === '') {
            console.log("Digite algo, tente novamente");
            console.log("Se deseja parar digite: CANCEL");
        }
        else if (isNaN(valor_s)) {
            console.log("A entrada digitada não é um número, tente novamente");
            console.log("Se deseja parar digite: CANCEL");
        }
        else
            break;
    }
    while (true) {
        quantidade_s = readLine.question("Quantidade: ").trim();
        if (quantidade_s.toUpperCase() == "CANCEL")
            return;
        else if (isNaN(quantidade_s) || !Number.isInteger(Number(quantidade_s))) {
            console.log("A entrada digitada não é um número inteiro, tente novamente");
            console.log("Se deseja parar digite: CANCEL");
        }
        else if (quantidade_s === '') {
            console.log("Digite algo, tente novamente");
            console.log("Se deseja parar digite: CANCEL");
        }
        else
            break;
    }
    let peso = parseFloat(peso_s);
    if (medida.toUpperCase() == 'G')
        peso /= 1000;
    let valor = parseFloat(valor_s);
    let quantidade = parseInt(quantidade_s);
    try {
        controle.adicionarItem(nome, peso, valor, quantidade);
    }
    catch (error) {
        throw error;
    }
}
function removerItem() {
    console.log("Removendo item");
    let index_s;
    while (true) {
        index_s = readLine.question("Index: ").trim();
        console.log(`${index_s} ${typeof index_s} ${Number.isInteger(index_s)}`);
        if (index_s.toUpperCase() == "CANCEL")
            return;
        else if (isNaN(index_s) || !Number.isInteger(Number(index_s))) {
            console.log("A entrada digitada não é um número inteiro, tente novamente");
            console.log("Se deseja parar digite: CANCEL");
        }
        else if (index_s === '') {
            console.log("Digite algo, tente novamente");
            console.log("Se deseja parar digite: CANCEL");
        }
        else
            break;
    }
    try {
        controle.removerItem(Number(index_s));
    }
    catch (error) {
        throw error;
    }
}
function listarInventario() {
    try {
        controle.listarItens();
    }
    catch (error) {
        throw error;
    }
}
function listarValorTotalInventario() {
    try {
        console.log(`O valor total do inventario é R$${controle.retornarValorTotal()}`);
    }
    catch (error) {
        throw error;
    }
}
function listarPesoTotalInventario() {
    try {
        console.log(`O peso total do inventario é ${controle.retornarPesoTotal()}Kg`);
    }
    catch (error) {
        throw error;
    }
}
function listarMediaValorInventario() {
    try {
        console.log(`A média de valor dos itens do inventario é R$${controle.retornarMediaValor()}`);
    }
    catch (error) {
        throw error;
    }
}
function listarMediaPesoInventario() {
    try {
        console.log(`A média de peso dos itens do inventario é ${controle.retornarMediaPeso()}Kg`);
    }
    catch (error) {
        throw error;
    }
}
function listarQuantidadeTotalInventario() {
    try {
        console.log(`A quantidade total de itens do inventario é ${controle.retornarQuantidadeTotal()}`);
    }
    catch (error) {
        throw error;
    }
}
function listarQuantidadeUnicaInventario() {
    try {
        console.log(`A quantidade de itens unicos do inventario é ${controle.retornarQuantidadeUnica()}`);
    }
    catch (error) {
        throw error;
    }
}
module.exports = { criarEstoque, lerItem, removerItem, listarInventario,
    listarMediaPesoInventario, listarMediaValorInventario, listarPesoTotalInventario, listarQuantidadeTotalInventario,
    listarQuantidadeUnicaInventario, listarValorTotalInventario };
//# sourceMappingURL=serviceEstoque.js.map