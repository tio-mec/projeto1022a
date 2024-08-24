import mysql, { QueryResult } from 'mysql2/promise';
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test',
});

connection
.then((conn)=>{
    console.log("Conectou no banco de dados.")

    const queryPreparada = conn.prepare("SELECT * from produtos");
    queryPreparada
    .then((query)=>{
        const queryExecutada = query.execute([])
        .then((result)=>{
            const [rows, filds] = result
            const dados = rows as Array<QueryResult>
            for( let linha of dados){
                console.log(linha)
            }
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



