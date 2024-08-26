import mysql, { RowDataPacket } from 'mysql2/promise';
type Output = {
    id:number,
    nome:string,
    descricao:string,
    preco:number,
    imagem:string
}
class ListaProdutos{
    execute(){
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'test',
        });
        return connection
        .then((conn)=>{
            console.log("Conectou no banco de dados.")
        
            const queryPreparada = conn.prepare("SELECT * from produtos");
            return queryPreparada
            .then((query)=>{
                const queryExecutada = query.execute([])
                return queryExecutada
                .then((result)=>{
                    const [rows, filds] = result
                    const dados = rows as RowDataPacket[]
                    const produtosDoBanco:Output[] = []
                    for( let linha of dados){
                        const id = linha.id
                        const nome =linha.nome
                        const descricao = linha.descricao
                        const preco = linha.preco
                        const imagem = linha.imagem
                        const produto = {
                            id,
                            nome,
                            descricao,
                            preco:parseFloat(preco),
                            imagem
                        }
                        produtosDoBanco.push(produto)
                    }
                    return produtosDoBanco
                })
                .catch()
            })
            .catch((e)=>{
                if(e.code === 'ER_NO_SUCH_TABLE'){
                    console.log("A tabela produtos não foi criada, "
                    +"Crie a tabela no workbench! :D");
                }else if(e.code==="ER_PARSE_ERROR"){
                    console.log("Sua query está com algo errado:")
                    console.log("Verifique: virgulas, pontos e nome de colunas.")
                }
                else{
                    console.log("Erro query desconhecido",e);
                }
            })
        
        })
        .catch((e)=>{
            if(e.code === 'ECONNREFUSED'){
                console.log("LIGAR O LARAGON!! MANÉ!");
            }else if(e.code === 'ER_BAD_DB_ERROR'){
                console.log("Deve criar o banco de DADOS {test}");
            }
            else{
                console.log("Erro ao conectar no banco",e);
            }
        })        
    }
}
export default ListaProdutos