const fs  = require('fs');
import  {Produto} from '../classes/produto'


const database : string = "estoque.csv";
const dir : string = "./data/";


function inserirLinha(p : Produto)
{
    // Abre um diretorio, caso ele na exista o diretorio é criado

    return new Promise ((resolve, reject) => {

        fs.mkdir(dir, {recursive: true}, (err : any) => {
        
            if(err)  reject(err);
    
            // Abre o arquivo especificado, caso ele não exista o arquivo é criado
            // O arquivo é aberto em modo append, adicionar no final
            fs.open(`${dir}${database}`, 'a', (err : any, fd : any) => {
    
                if (err) reject(err);
    
                fs.write(fd,  `${p.index},${p.nome},${p.peso},
                ${p.preco},${p.quantidade}\n`, (err : any) => {
                    if (err) reject(err);
    
                    fs.close(fd, (err : any) => {
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
    return new Promise((resolve, reject) => {

        fs.readFile(`${dir}${database}`, 'utf8', (err : any, data : string) => {
        
            if(err) reject(err);
    
            let rows = data.split(/[\r\n]/);
    
            for (let value of rows)
            {
                let collum = value.split(',');
    
                if (Number(collum[0]) == id)
                {   

                    let p = new Produto(Number(collum[0]), collum[1],
                    Number(collum[2]), Number(collum[3]), Number(collum[4]));

                    resolve(p);

                    break;
                }
            }

           // The value was not find 
            resolve(null);
        })

    });
}

function removerLinha(id : number)
{
    return new Promise((resolve, reject) => {

        fs.readFile(`${dir}${database}`, 'utf8', (err : any, data : string) => {
        
            if(err) reject(err);
    
            // O arquivo é dividido por linhas, em seguida é filtrado
            let rows = data.split(/[\r\n]/).filter( value => {
                
                let collum = value.split(',');

                return Number(collum[0]) != id;

            });


            let newContent = rows.join('\n');


            // O arquivo filtrado é sobreposto com o novo conteudo
            fs.open(`${dir}${database}`, 'w', (err : any, fd : any) => {

                if (err) reject(err);

                fs.write(fd, newContent, (err : any) => {
                    
                    if (err) reject(err);

                    fs.close(fd, (err : any) => {

                        if (err) reject(err);

                        resolve("Linha removida com sucesso");
                    })
                })
            })

        })

    }); 
}


function retornarItens() {

    return new Promise((resolve, reject) => {

        fs.readFile(`${dir}${database}`, 'utf8', (err : any, data : string) => {
        
            if(err) reject(err);
    
            let itens = data.split(/[\r\n]/).map(value => {

                let collum = value.split(',');

                let p = new Produto(Number(collum[0]), collum[1],
                Number(collum[2]), Number(collum[3]), Number(collum[4]));

                return p;
            });

            resolve(itens);

        })
    });
}


module.exports = {inserirLinha, recuperarLinha, removerLinha, retornarItens};