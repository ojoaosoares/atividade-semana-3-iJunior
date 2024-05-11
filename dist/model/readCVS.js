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
    });
    // Abre o arquivo especificado, caso ele não exista o arquivo é criado
    fs_1.default.open(`${dir}${database}`, 'a', (err, fd) => {
        if (err)
            throw err;
        console.log("O arquivo foi aberto aberto");
        fs_1.default.write(fd, linha, err => {
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
}
inserirLinha("cu\n");
//# sourceMappingURL=readCVS.js.map