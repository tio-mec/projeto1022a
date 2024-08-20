type Produto={
    id:string,
    nome:string,
    preco:number,
    imagem:string,
    descricao:string
}

let produto:Produto = {
    id:"1",
    nome:"Caneta Azul",
    descricao:"Caneta Bic de cor azul",
    imagem:"Inexistente",
    preco:2
}
console.log(produto)

// Get the client
import mysql from 'mysql2/promise';

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test',
});

connection.catch((e)=>{
    console.log("Erro ao conectar no banco");
})

connection.then((conn)=>{
    // A simple SELECT query
    try {
        const connection = conn.connect()
        const [results, fields] = (
        'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45'
        );
    
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    } catch (err) {
        console.log(err);
    }
})


