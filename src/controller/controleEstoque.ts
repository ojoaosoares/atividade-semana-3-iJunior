import { read } from "fs";

const readCVS = require('../model/readCVS');
import  {Produto} from '../classes/produto';

function adicionarItem(index : number, nome : string, peso : number,
valor : number, quantidade : number) {

    return new Promise ((resolve : any, reject : any) => {
        
        readCVS.recuperarLinha(index)

        .then((result) => {

            if(result.length > 0)
                reject("Index já existe");

            else
            {            
                let produto = new Produto(index, nome, peso, valor, quantidade);
                readCVS.inserirLinha(produto);
            }
            
        }).catch((err) => {
            reject(err);
        });
    })
    
}