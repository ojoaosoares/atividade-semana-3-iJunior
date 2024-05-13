const service = require('./service/serviceEstoque')
const readLine = require('readline-sync');


let key : number;

service.criarEstoque();

do {

    console.log('Escolha uma opção:');
    console.log('1. Inserir item');
    console.log('2. Remover item');
    console.log('3. Listar itens');
    console.log('4. Pesquisar por nome');
    console.log('5. Listar valor total dos itens');
    console.log('6. Listar peso total dos itens');
    console.log('7. Listar quantidade total de itens');
    console.log('8. Listar quantidade unica de itens');
    console.log('9. Listar media de valor dos itens');
    console.log('10. Listar media de peso dos itens');
    console.log('0. Parar programa');
    
    key = readLine.questionInt("Opção: ");

    switch (key) {
        case 0:
            console.log("ENCERRANDO...");
            break;
        case 1:
            try {
                service.lerItem();

            } catch (error) {
                
                if (error === "Arquivo ou diretorio não existe")
                    service.criarEstoque();
                else
                    throw error
            }
            
            break;
        case 2:
            try {
                service.removerItem();

            } catch (error) {
                
                if (error === "Arquivo ou diretorio não existe")
                    service.criarEstoque();
                else if (error === "Item não existe")
                    console.log(error);
                else
                    throw error
            }
            break;
        case 3:
            try {
                service.listarInventario();

            } catch (error) {
                
                if (error === "Arquivo ou diretorio não existe")
                    service.criarEstoque();
                else
                    throw error
            }
            break;
        case 3:
            try {
                service.listarInventario();

            } catch (error) {
                
                if (error === "Arquivo ou diretorio não existe")
                    service.criarEstoque();
                else
                    throw error
            }
            break;
        case 4:
            try {
                service.pesquisarPorNomeInventario();

            } catch (error) {
                
                if (error === "Arquivo ou diretorio não existe")
                    service.criarEstoque();
                else
                    throw error
            }
            
            break;
        case 5:
            try {
                service.listarValorTotalInventario();

            } catch (error) {
                
                if (error === "Arquivo ou diretorio não existe")
                    service.criarEstoque();
                else
                    throw error
            }
            break;
        case 6:
            try {
                service.listarPesoTotalInventario();

            } catch (error) {
                
                if (error === "Arquivo ou diretorio não existe")
                    service.criarEstoque();
                else
                    throw error
            }
            break;
        case 7:
            try {
                service.listarQuantidadeTotalInventario();

            } catch (error) {
                
                if (error === "Arquivo ou diretorio não existe")
                    service.criarEstoque();
                else
                    throw error
            }
            break;
        case 8:
            try {
                service.listarQuantidadeUnicaInventario();

            } catch (error) {
                
                if (error === "Arquivo ou diretorio não existe")
                    service.criarEstoque();
                else
                    throw error
            }
            break;
        case 9:
            try {
                service.listarMediaValorInventario();

            } catch (error) {
                
                if (error === "Arquivo ou diretorio não existe")
                    service.criarEstoque();
                else
                    throw error
            }
            break;
        case 10:
            try {
                service.listarMediaPesoInventario();

            } catch (error) {
                
                if (error === "Arquivo ou diretorio não existe")
                    service.criarEstoque();
                else
                    throw error
            }
            break;
        
        default:
            console.log("Opção invalida");
            break;
    }


} while (key !== 0)
