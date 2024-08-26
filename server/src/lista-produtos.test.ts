import {test,expect,describe} from 'vitest'
import ListaProdutos from './lista-produtos';

test("Deve listar os produtos do banco de dados",async()=>{
    //GIVEN   -> dado alguma coisa
    const produtoPreCadastrado = [{
        id:1,
        nome:"Iphone",
        descricao:"Celular Ruim",
        preco:4000.50,
        imagem: "https://s2-techtudo.glbimg.com/fQiJ0IoTPyS7kOji53qOHDP_VWM=/0x0:4000x2664/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/J/F/1YRriISlAbBwU7zUr7wQ/marca-d-aguadd.png"
    }]
    const listaProdutos = new ListaProdutos()
    //WHEN    -> Quando eu fizer algo
    const produtos = await listaProdutos.execute()
    //THEN    -> Eu espero que aconteça;
    expect(produtos).toEqual(produtoPreCadastrado)
});