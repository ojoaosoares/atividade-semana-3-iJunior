"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const produto_1 = require("../classes/produto");
const database = "estoque.csv";
const dir = "./data/";
function inserirLinha(p) {
    return __awaiter(this, void 0, void 0, function* () {
        // Abre um diretorio, caso ele na exista o diretorio é criado
        return new Promise((resolve, reject) => {
            fs.mkdir(dir, { recursive: true }, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                // Abre o arquivo especificado, caso ele não exista o arquivo é criado
                // O arquivo é aberto em modo append, adicionar no final
                fs.open(`${dir}${database}`, 'a', (err, fd) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        reject(err);
                        return;
                    }
                    let index_repetido = yield recuperarLinha(p.index);
                    if (index_repetido !== null) {
                        reject("Index repetido");
                        return;
                    }
                    fs.write(fd, `${p.index},${p.nome},${p.peso},${p.preco},${p.quantidade}\n`, (err) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        fs.close(fd, (err) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            resolve("Inserção de linha concluida com sucesso");
                            return;
                        });
                    });
                }));
            });
        });
    });
}
function recuperarLinha(id) {
    return new Promise((resolve, reject) => {
        fs.readFile(`${dir}${database}`, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            let rows = data.split(/[\r\n]/);
            for (let value of rows) {
                let collum = value.trim().split(',');
                if (Number(collum[0]) == id && collum.length == 5) {
                    let p = new produto_1.Produto(Number(collum[0]), collum[1], Number(collum[2]), Number(collum[3]), Number(collum[4]));
                    resolve(p);
                    return;
                }
            }
            // The value was not find 
            resolve(null);
            return;
        });
    });
}
function removerLinha(id) {
    return new Promise((resolve, reject) => {
        fs.readFile(`${dir}${database}`, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            // O arquivo é dividido por linhas, em seguida é filtrado
            let rows = data.split(/[\r\n]/).filter(value => {
                let collum = value.split(',');
                return Number(collum[0]) != id;
            });
            let newContent = rows.join('\n');
            // O arquivo filtrado é sobreposto com o novo conteudo
            fs.open(`${dir}${database}`, 'w', (err, fd) => {
                if (err) {
                    reject(err);
                    return;
                }
                fs.write(fd, newContent, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    fs.close(fd, (err) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve("Linha removida com sucesso");
                        return;
                    });
                });
            });
        });
    });
}
function retornarItens() {
    return new Promise((resolve, reject) => {
        fs.readFile(`${dir}${database}`, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            let itens = data.split(/[\r\n]/).map(value => {
                let collum = value.split(',');
                let p = new produto_1.Produto(Number(collum[0]), collum[1], Number(collum[2]), Number(collum[3]), Number(collum[4]));
                return p;
            });
            resolve(itens);
            return;
        });
    });
}
module.exports = { inserirLinha, recuperarLinha, removerLinha, retornarItens };
//# sourceMappingURL=readCVS.js.map