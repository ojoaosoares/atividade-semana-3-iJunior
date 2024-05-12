"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readCVS = require('../model/readCVS');
const produto_1 = require("../classes/produto");
function adicionarItem(index, nome, peso, valor, quantidade) {
    return new Promise((resolve, reject) => {
        let produto = new produto_1.Produto(index, nome, peso, valor, quantidade);
        readCVS.inserirLinha(produto)
            .then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
}
adicionarItem(24, "Produto D", 0.3, 5.25, 75)
    .then(result => {
    console.log(result);
})
    .catch(err => {
    console.log(err);
});
//# sourceMappingURL=controleEstoque.js.map