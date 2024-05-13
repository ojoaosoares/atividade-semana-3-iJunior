"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controle = require('../controller/controleEstoque');
const readLine = require('readline-sync');
function lerItem() {
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
    nome = nome.toUpperCase();
    let peso = parseFloat(peso_s);
    if (medida.toUpperCase() == 'G')
        peso /= 1000;
    let valor = parseFloat(valor_s);
    let quantidade = parseInt(quantidade_s);
    controle.adicionarItem(nome, peso, valor, quantidade);
}
controle.iniciarDatabase();
lerItem();
//# sourceMappingURL=serviceEstoque.js.map