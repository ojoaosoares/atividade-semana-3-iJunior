import { read } from "fs";

const readCVS = require('../model/readCVS');
import  {Produto} from '../classes/produto';


function iniciarDatabase() {

    readCVS.criarArquivos();
}

function adicionarItem(nome : string, peso : number,
    valor : number, quantidade : number) { 

    try {

        let index = readCVS.retornarIndex();
    
        while (readCVS.indexExiste(index))
            index++;
    
        let produto = new Produto(index, nome, peso, valor, quantidade);
    
        readCVS.inserirLinha(produto);
        
        readCVS.atualizarIndex(index + 1);

    } catch (error) {
        throw error;
    }           
}

function removerItem(index : number) {

    try {
        readCVS.removerLinha(index);    
    } catch (error) {
        throw error;
    }
}

function listarItens() {

    let itens : Array<Produto>;
    
    try {
        itens = readCVS.retornarItens();   
    } catch (error) {
        throw error
    }

    console.log("INDEX - NOME - PESO - VALOR - QUANTIDADE");

    itens.forEach(element => {
        element.imprimir();
    })
}

function retornarValorTotal() {

    let valor_total : number;
    try {
        valor_total = readCVS.retornarItens().reduce((acumulador, valorAtual) => {
            return acumulador + (valorAtual.quantidade * valorAtual.valor);
        }, 0);
    } catch (error) {
        throw error;
    }

    return valor_total;
}

function retornarPesoTotal() {

    let peso_total : number;

    try {

        peso_total = readCVS.retornarItens().reduce((acumulador, valorAtual) => {
            return acumulador + (valorAtual.quantidade * valorAtual.peso);
        }, 0);    

    } catch (error) {
        throw error;
    }

    return peso_total;
    
}


function retornarQuantidadeTotal() {

    let quantidade_total : number;

    try {
        quantidade_total = readCVS.retornarItens().reduce((acumulador, valorAtual) => {
            return acumulador + valorAtual.quantidade;
        }, 0);
    } catch (error) {
        throw error;
    }

    return quantidade_total;
}

function retornarQuantidadeUnica() {
    
    let quantidade_unica : number;

    try {
        quantidade_unica = readCVS.retornarItens().length;    
    } catch (error) {
        throw error;
    }
    
}


function retornarMediaValor() {
    
    let media_valor : number
    try {
        media_valor = retornarValorTotal()/retornarQuantidadeTotal();
    } catch (error) {
        throw error;
    }

    return media_valor;
}

function retornarMediaPeso() {
    
    let media_peso : number;

    try {
        media_peso = retornarPesoTotal()/retornarQuantidadeTotal();
    } catch (error) {
        throw error;
    }

    return media_peso;
    
}


module.exports = {adicionarItem, removerItem, listarItens, retornarValorTotal,
    retornarPesoTotal, retornarQuantidadeTotal, retornarQuantidadeUnica,
    retornarMediaValor, retornarMediaPeso, iniciarDatabase};