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

    itens.forEach(element => {
        element.imprimir();
    })
}

