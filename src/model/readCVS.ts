import { error } from 'console';
import fs from 'fs';
import { resolve } from 'path';

const database : string = "estoque.csv";
const dir : string = "./data/";

function inserirLinha(linha : string)
{
    // Abre um diretorio, caso ele na exista o diretorio é criado

    return new Promise ((resolve, reject) => {

        fs.mkdir(dir, {recursive: true}, (err) => {
        
            if(err)  reject(err);
    
            // Abre o arquivo especificado, caso ele não exista o arquivo é criado
            // O arquivo é aberto em modo append, adicionar no final
            fs.open(`${dir}${database}`, 'a', (err, fd) => {
    
                if (err) reject(err);
    
                fs.write(fd, linha + '\n', err => {
                    if (err) reject(err);
    
                    fs.close(fd, err => {
                        if (err) reject(err);
    
                        resolve("Inserção de linha concluida com sucesso");
                    })
                })
            })
        })
    });

}

 
function recuperarLinha(id : number)
{
    return new Promise<Array<any>>((resolve, reject) => {

        fs.readFile(`${dir}${database}`, 'utf8', (err, data) => {
        
            if(err) reject(err);
    
            let rows = data.split(/[\r\n]/);
    
            for (let value of rows)
            {
                let collum = value.split(',');
    
                if (Number(collum[0]) == id)
                {   
                    resolve(collum);
                    break;
                }
            }

           // The value was not find 
            resolve([]);
        })

    });
}

function removerLinha(id : number)
{
    return new Promise((resolve, reject) => {

        fs.readFile(`${dir}${database}`, 'utf8', (err, data) => {
        
            if(err) reject(err);
    
            // O arquivo é dividido por linhas, em seguida é filtrado
            let rows = data.split(/[\r\n]/).filter( value => {
                
                let collum = value.split(',');

                return Number(collum[0]) != id;

            });


            let newContent = rows.join('\n');


            // O arquivo filtrado é sobreposto com o novo conteudo
            fs.open(`${dir}${database}`, 'w', (err, fd) => {

                if (err) reject(err);

                fs.write(fd, newContent, err => {
                    
                    if (err) reject(err);

                    fs.close(fd, err => {

                        if (err) reject(err);

                        resolve("Linha removida com sucesso");
                    })
                })
            })

        })

    }); 
}


removerLinha(3)
    .then(message => {
        console.log(message);
    })
    .catch(err => {
        console.log(err);
    })


