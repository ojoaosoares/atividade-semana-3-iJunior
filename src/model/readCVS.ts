import { error } from 'console';
import fs from 'fs';

const database : string = "estoque.csv";
const dir : string = "./data/";

function inserirLinha(linha : string) : void
{
    // Abre um diretorio, caso ele na exista o diretorio é criado
    fs.mkdir(dir, {recursive: true}, (err) => {
        
        if(err) throw err;
        console.log("O diretorio foi aberto");
    })

    // Abre o arquivo especificado, caso ele não exista o arquivo é criado
    fs.open(`${dir}${database}`, 'a', (err, fd) => {

        if (err) throw err;

        console.log("O arquivo foi aberto aberto");

        fs.write(fd, linha, err => {
            if (err) throw err;

            console.log("Arquivo foi escrito com sucesso")

            fs.close(fd, err => {
                if (err) throw err;
                
                console.log("Arquivo foi fechado com sucesso")
            })
        })
    })

}


inserirLinha("cu\n");
