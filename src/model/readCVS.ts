const fs  = require('fs');
import  {Produto} from '../classes/produto'


const database : string = "estoque.csv";
const dir : string = "./data/";


// async function inserirLinha(p : Produto)
// {
//     // Abre um diretorio, caso ele na exista o diretorio é criado

//     return new Promise ((resolve, reject) => {

//         fs.mkdir(dir, {recursive: true}, (err : any) => {
        
//             if (err) {
//                 reject(err);
//                 return;
//             }
    
//             // Abre o arquivo especificado, caso ele não exista o arquivo é criado
//             // O arquivo é aberto em modo append, adicionar no final
//             fs.open(`${dir}${database}`, 'a', async (err : any, fd : any) => {
    
//                 if (err) {
//                     reject(err);
//                     return;
//                 }

//                 let index_repetido = await recuperarLinha(p.index);

//                 if(index_repetido !== null)
//                 {
//                     reject("Index repetido");
//                     return;
//                 }
    
//                 fs.write(fd,  `${p.index},${p.nome},${p.peso},${p.preco},${p.quantidade}\n`, (err : any) => {
//                     if (err) {
//                         reject(err);
//                         return;
//                     }
    
//                     fs.close(fd, (err : any) => {
//                         if (err) {
//                             reject(err);
//                             return;
//                         }
    
//                         resolve("Inserção de linha concluida com sucesso");
//                         return;
//                     })
//                 })
//             })
//         })
//     });

// }


function inserirLinha(p : Produto)
{
        // Abre um diretorio, caso ele na exista o diretorio é criado

        fs.mkdirSync(dir, {recursive: true})
        
        // Abre o arquivo especificado, caso ele não exista o arquivo é criado
        // O arquivo é aberto em modo append, adicionar no final
        let fd = fs.openSync(`${dir}${database}`, 'a');
            
        if(recuperarLinha(p.index) != null)
            throw "Index já cadastrado";
        
        fs.writeSync(fd, `${p.index},${p.nome},${p.peso},${p.valor},${p.quantidade}\n`);
    
        fs.closeSync(fd);

}


 
// function recuperarLinha(id : number)
// {
//     return new Promise((resolve, reject) => {

//         fs.readFile(`${dir}${database}`, 'utf8', (err : any, data : string) => {
        
//             if(err)
//             {
//                 reject(err);
//                 return;
//             }
    
//             let rows = data.split(/[\r\n]/);
    
//             for (let value of rows)
//             {
//                 let collum = value.trim().split(',');
    
//                 if (Number(collum[0]) == id && collum.length == 5)
//                 {   

//                     let p = new Produto(Number(collum[0]), collum[1],
//                     Number(collum[2]), Number(collum[3]), Number(collum[4]));

//                     resolve(p);
//                     return;
//                 }
//             }

//            // The value was not find 
//             resolve(null);
//             return;
//         })

//     });
// }


function recuperarLinha(id : number)
{
    if(recuperarLinha(id) == null)
        throw "Index não existe";

    let data = fs.readFileSync(`${dir}${database}`, 'utf8');
    
    let rows = data.split(/[\r\n]/);

    for (let value of rows)
    {
        let collum = value.trim().split(',');

        if (Number(collum[0]) == id && collum.length == 5)
        {   

            let p = new Produto(Number(collum[0]), collum[1],
            Number(collum[2]), Number(collum[3]), Number(collum[4]));

            return p;        
        }
    }

    // The value was not find 
    return null;
}

// function removerLinha(id : number)
// {
//     return new Promise((resolve, reject) => {

//         fs.readFile(`${dir}${database}`, 'utf8', (err : any, data : string) => {
        
//             if(err) {
//                 reject(err);
//                 return;
//             }
    
//             // O arquivo é dividido por linhas, em seguida é filtrado
//             let rows = data.split(/[\r\n]/).filter( value => {
                
//                 let collum = value.split(',');

//                 return Number(collum[0]) != id;

//             });


//             let newContent = rows.join('\n');


//             // O arquivo filtrado é sobreposto com o novo conteudo
//             fs.open(`${dir}${database}`, 'w', (err : any, fd : any) => {

//                 if (err) {
//                     reject(err);
//                     return;
//                 }

//                 fs.write(fd, newContent, (err : any) => {
                    
//                     if (err) {
//                         reject(err);
//                         return;
//                     }

//                     fs.close(fd, (err : any) => {

//                         if (err) {
//                             reject(err);
//                             return;
//                         }

//                         resolve("Linha removida com sucesso");
//                         return;
//                     })
//                 })
//             })

//         })

//     }); 
// }


function removerLinha(id : number)
{

        if(recuperarLinha(id) == null)
            throw "Index não existe";

        let data = fs.readFileSync(`${dir}${database}`, 'utf8')
        
        // O arquivo é dividido por linhas, em seguida é filtrado
        let rows = data.split(/[\r\n]/).filter( value => {
            
            let collum = value.split(',');

            return Number(collum[0]) != id;

        });

        let newContent = rows.join('\n');

        // O arquivo filtrado é sobreposto com o novo conteudo
        let fd = fs.openSync(`${dir}${database}`, 'w');

        fs.writeSync(fd, newContent);
                    
        fs.close(fd);
}


// function retornarItens() {

//     return new Promise((resolve, reject) => {

//         fs.readFile(`${dir}${database}`, 'utf8', (err : any, data : string) => {
        
//             if (err) {
//                 reject(err);
//                 return;
//             }
    
//             let itens = data.split(/[\r\n]/).map(value => {

//                 let collum = value.split(',');

//                 let p = new Produto(Number(collum[0]), collum[1],
//                 Number(collum[2]), Number(collum[3]), Number(collum[4]));

//                 return p;
//             });

//             resolve(itens);
//             return;

//         })
//     });
// }


function retornarItens() {

    let data = fs.readFileSync(`${dir}${database}`, 'utf8')        

    let itens = data.split(/[\r\n]/).filter(value => {

        return (value.split(',').length == 5) && value.trim !== '';
    })
    .map(value => {

        let collum = value.split(',');

        let p = new Produto(Number(collum[0]), collum[1],
        Number(collum[2]), Number(collum[3]), Number(collum[4]));

        return p;
    });

    return itens;        
}


module.exports = {inserirLinha, recuperarLinha, removerLinha, retornarItens};