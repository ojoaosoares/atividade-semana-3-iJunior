"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const database = "estoque.csv";
const dir = "./data/";
function inserirLinha(linha) {
    // Abre um diretorio, caso ele na exista o diretorio é criado
    fs_1.default.mkdir(dir, { recursive: true }, (err) => {
        if (err)
            throw err;
        console.log("O diretorio foi aberto");
        // Abre o arquivo especificado, caso ele não exista o arquivo é criado
        fs_1.default.open(`${dir}${database}`, 'a', (err, fd) => {
            if (err)
                throw err;
            console.log("O arquivo foi aberto aberto");
            fs_1.default.write(fd, linha + '\n', err => {
                if (err)
                    throw err;
                console.log("Arquivo foi escrito com sucesso");
                fs_1.default.close(fd, err => {
                    if (err)
                        throw err;
                    console.log("Arquivo foi fechado com sucesso");
                });
            });
        });
    });
}
function recuperarLinha(id) {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(`${dir}${database}`, 'utf8', (err, data) => {
            if (err)
                reject(err);
            let rows = data.split(/[\r\n]/);
            for (let value of rows) {
                let collum = value.split(',');
                if (Number(collum[0]) == id) {
                    resolve(collum);
                    break;
                }
            }
            // The value was not find 
            resolve([]);
        });
    });
}
function removerLinha(id) {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(`${dir}${database}`, 'utf8', (err, data) => {
            if (err)
                reject(err);
            let rows = data.split(/[\r\n]/).filter(value => {
                let collum = value.split(',');
                return Number(collum[0]) != id;
            });
            let newContent = rows.join('\n');
            fs_1.default.open(`${dir}${database}`, 'w', (err, fd) => {
                if (err)
                    reject(err);
                fs_1.default.write(fd, newContent, err => {
                    if (err)
                        reject(err);
                    fs_1.default.close(fd, err => {
                        if (err)
                            reject(err);
                    });
                });
            });
            resolve("Linha removida com sucesso");
        });
    });
}
removerLinha(3)
    .then(message => {
    console.log(message);
})
    .catch(err => {
    console.log(err);
});
//# sourceMappingURL=readCVS.js.map