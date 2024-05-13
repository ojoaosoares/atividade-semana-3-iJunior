"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const produto_1 = require("../classes/produto");
const database = "estoque.csv";
const index_item = "index.csv";
const dir = "./data/";
function criarArquivos() {
    if (!fs.existsSync(`${dir}${database}`)) {
        fs.mkdirSync(dir, { recursive: true });
        let fd1 = fs.openSync(`${dir}${database}`, 'w');
        fs.closeSync(fd1);
        let fd2 = fs.openSync(`${dir}${index_item}`, 'w');
        fs.writeSync(fd2, "1");
        fs.closeSync(fd2);
    }
    else if (!fs.existsSync(`${dir}${database}`)) {
        let fd1 = fs.openSync(`${dir}${database}`, 'w');
        fs.closeSync(fd1);
    }
    else if (!fs.existsSync(`${dir}${index_item}`)) {
        let fd2 = fs.openSync(`${dir}${index_item}`, 'w');
        fs.writeSync(fd2, "1");
        fs.closeSync(fd2);
    }
}
function retornarIndex() {
    if (!fs.existsSync(`${dir}${index_item}`))
        throw "Arquivo ou diretorio não existe";
    let data = fs.readFileSync(`${dir}${index_item}`, 'utf8');
    return Number(data);
}
function atualizarIndex(index) {
    if (!fs.existsSync(`${dir}${index_item}`))
        throw "Arquivo ou diretorio não existe";
    let fd2 = fs.openSync(`${dir}${index_item}`, 'w');
    fs.writeSync(fd2, `${index}`);
    fs.closeSync(fd2);
}
function inserirLinha(p) {
    if (!fs.existsSync(`${dir}${database}`))
        throw "Arquivo ou diretorio não existe";
    // Abre o arquivo especificado, caso ele não exista o arquivo é criado
    // O arquivo é aberto em modo append, adicionar no final
    let fd = fs.openSync(`${dir}${database}`, 'a');
    fs.writeSync(fd, `${p.index},${p.nome},${p.peso},${p.valor},${p.quantidade}\n`);
    fs.closeSync(fd);
}
function recuperarLinha(id) {
    if (!fs.existsSync(`${dir}${database}`))
        throw "Arquivo ou diretorio não existe";
    let data = fs.readFileSync(`${dir}${database}`, 'utf8');
    let rows = data.split(/[\r\n]/);
    for (let value of rows) {
        let collum = value.trim().split(',');
        if (Number(collum[0]) == id && collum.length == 5) {
            let p = new produto_1.Produto(Number(collum[0]), collum[1], Number(collum[2]), Number(collum[3]), Number(collum[4]));
            return p;
        }
    }
    // The value was not find 
    throw "Index não existe";
}
function indexExiste(id) {
    if (!fs.existsSync(`${dir}${database}`))
        throw "Arquivo ou diretorio não existe";
    let data = fs.readFileSync(`${dir}${database}`, 'utf8');
    let rows = data.split(/[\r\n]/);
    for (let value of rows) {
        let collum = value.trim().split(',');
        if (Number(collum[0]) == id && collum.length == 5) {
            return true;
        }
    }
    // The value was not find 
    return false;
}
function removerLinha(id) {
    if (!fs.existsSync(`${dir}${database}`))
        throw "Arquivo ou diretorio não existe";
    if (indexExiste(id) == false)
        throw "Index não existe";
    let data = fs.readFileSync(`${dir}${database}`, 'utf8');
    // O arquivo é dividido por linhas, em seguida é filtrado
    let rows = data.split(/[\r\n]/).filter(value => {
        let collum = value.split(',');
        return Number(collum[0]) != id;
    });
    let newContent = rows.join('\n');
    // O arquivo filtrado é sobreposto com o novo conteudo
    let fd = fs.openSync(`${dir}${database}`, 'w');
    fs.writeSync(fd, newContent);
    fs.close(fd);
}
function retornarItens() {
    if (!fs.existsSync(`${dir}${database}`))
        throw "Arquivo ou diretorio não existe";
    let data = fs.readFileSync(`${dir}${database}`, 'utf8');
    let itens = data.split(/[\r\n]/).filter(value => {
        return (value.split(',').length == 5) && value.trim !== '';
    })
        .map(value => {
        let collum = value.split(',');
        let p = new produto_1.Produto(Number(collum[0]), collum[1], Number(collum[2]), Number(collum[3]), Number(collum[4]));
        return p;
    });
    return itens;
}
module.exports = { criarArquivos, retornarIndex, atualizarIndex, indexExiste, inserirLinha, recuperarLinha, removerLinha, retornarItens };
//# sourceMappingURL=readCVS.js.map