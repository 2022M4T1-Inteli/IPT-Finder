// const { urlencoded } = require('express');
// const express = require('express');
// const bodyParser = require('body-parser');
// const urlencodedParser = bodyParser.urlencoded({ extended: false })

// const hostname = '127.0.0.1';
// const port = 3021;
// const app = express();

// const sqlite3 = require('sqlite3').verbose();
// const sqlite = require("sqlite")

// app.use(express.json());

// /* Definição dos endpoints */

// app.get('/dispositivo', (req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
//     async function dispositivo() {
//         /* Essa parte da função abre o banco de dados*/
//         const db = await sqlite.open({
//             filename: "./database/dispositivos.db",
//             driver: sqlite3.Database
//         })

//         /* Essa parte da função aguarda a abertura do banco e realiza a query indicada entre parênteses */
//         const result = await db.all('SELECT * FROM teste')

//         /**Essa parte fecha o banco de dados */
//         await db.close()
//         /** Essa parte mostra o resultado */
//         res.send(result)
//     }

//     dispositivo()
// });



// app.post('/novosDispositivos', urlencodedParser, (res, req) => {
//     async function novosDispositivos() {
//         /**Abertura do banco de dados */
//         const db = await sqlite.open({
//             filename: "./database/dispositivos.db",
//             driver: sqlite3.Database
//         })
//         //Criação da query que insere novos dispositivos no banco
//         sql = "INSERT INTO objetos (nome, predio, sala, andar, data_hora, codigo_patrimonio) VALUES ('" + req.body.nome + "', '" + req.body.predio + "', '" + req.body.sala + "', '" + req.body.andar + "', '" + req.body.data_hora + '" , " ' + req.body, codigo_patrimonio + '")"';
//         const teste = await db.run(sql)

//         // essa condição confere se houve mudanças no banco de dados e retorna status de acordo com o resultado
//         if (teste.changes === 0) {
//             res.statusCode(500)
//         } else {
//             res.statusCode(200)
//         }
//         db.close()
//     }

//     novosDispositivos()

// })



// app.post('/login', urlencodedParser, (req, res) => {

//     const { nome, senha } = req.body
//     async function login() {
//         const db = await sqlite.open({
//             filename: "./database/dispositivos.db",
//             driver: sqlite3.Database
//         })

//         const teste = await db.all("SELECT * FROM usuarios WHERE nome == ?", [nome])

//         if (!teste[0]) {
//             res.status(400).send
//         } else {
//             return teste[0]
//         }
//         await db.close()
//     }

//     login()
// })


// /* Inicia o servidor */
// app.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });

