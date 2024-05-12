import { read } from "fs";

const readCVS = require('../model/readCVS');
import  {Produto} from '../classes/produto';

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

function adicionarItem(index : number, nome : string, peso : number,
    valor : number, quantidade : number) { 
                      
    let produto = new Produto(index, nome, peso, valor, quantidade);
    
    try {
        readCVS.inserirLinha(produto);    
    } catch (error) {
        console.log (error);
    }           
}

function removerItem(index : number) {

    try {
        readCVS.removerLinha(index);    
    } catch (error) {
        console.log(error);
    }
}

function listarItens() {

    let itens = readCVS.retornarItens();

    console.log("INDEX - NOME - PESO - VALOR - QUANTIDADE");

    itens.forEach(element => {
        element.imprimir();
    })
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


function retornarQuantidadeTotal() {

    return readCVS.retornarItens().reduce((acumulador, valorAtual) => {
        return acumulador + valorAtual.quantidade;
    }, 0);
}

function retornarQuantidadeUnica() {
    
    return readCVS.retornarItens().length();
}


function retornarMediaValor() {
    
    return retornarValorTotal()/retornarQuantidadeTotal();
}

function retornarMediaPeso() {
    
    return retornarPesoTotal()/retornarQuantidadeTotal();
}


module.exports = {adicionarItem, removerItem, listarItens, retornarValorTotal,
    retornarPesoTotal, retornarQuantidadeTotal, retornarQuantidadeUnica, retornarMediaValor, retornarMediaPeso};