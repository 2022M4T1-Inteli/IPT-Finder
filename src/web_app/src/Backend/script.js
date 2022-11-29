//Testes
var WebSocketServer = require('websocket').server;
var http = require('http');
//Cria o server
var server = http.createServer();

const { urlencoded } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const hostname = '10.128.65.2';
const port = 8080;
const app = express();

const sqlite3 = require('sqlite3').verbose();
const sqlite = require("sqlite")
const DBPATH = 'Src/Backend/database/dispositivo.db';

app.use(express.json());

/* Definição dos endpoints */

app.get('/dispositivo', (req, res) => {
    async function teste() {

        const db = await sqlite.open({
            filename: "./database/dispositivos.db",
            driver: sqlite3.Database
        })

        const result = await db.all('SELECT * FROM teste')

        await db.close()

        res.send(result)
    }

    teste()
});



app.post('/novosDispositivos', urlencodedParser, (res, req) => {

    async function novosDispositivos() {
        const db = await sqlite.open({
            filename: "./database/dispositivos.db",
            driver: sqlite3.Database
        })

        sql = "INSERT INTO objetos (nome, predio, sala, andar, data_hora, codigo_patrimonio) VALUES ('" + req.body.nome + "', '" + req.body.predio + "', '" + req.body.sala + "', '" + req.body.andar + "', '" + req.body.data_hora + '" , " '+ req.body,codigo_patrimonio +'")"';

        const teste = await db.run(sql)
        
        if(teste.changes === 0){
            res.statusCode(400)
        }else{
            res.statusCode(200)
        }

        db.close()

    }

    novosDispositivos()

})



app.post('/login', urlencodedParser, (res, req) => {
    res.statusCode = 200;
    res.setHeader('Acess-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);

    sql = "INSERT INTO login (email, senha) VALUES ('" + req.body.email + "', " + req.body.senha + ")";

    console.log(sql);

    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
    })
    res.rawListeners('<p> "Login realizado com sucesso" </p>');
    db.close();
    res.end();
})

/* Inicia o servidor */
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


//------------WebSocket--------
//Cria o WebSocket server
wsServer = new WebSocketServer({
    httpServer: server
  });

//Chamado quando um client deseja conectar
  wsServer.on('request', (request) => {
      //Estado do led: false para desligado e true para ligado
      let state = false;
  
      //Aceita a conexão do client
      let client = request.accept(null, request.origin);
  
      //Chamado quando o client envia uma mensagem
      client.on('message', (message) => {
          //Se é uma mensagem string utf8
          if (message.type === 'utf8') {
              //Mostra no console a mensagem
              console.log(message.utf8Data);
          }
      });
  
      //Cria uma função que será executada a cada 1 segundo (1000 millis) para enviar o estado do led
      let interval = setInterval(() => {
          //Envia para o client "ON" ou "OFF" dependendo do estado atual da variável state
          client.sendUTF(state? "ON" : "OFF");
          //Inverte o estado
          state = !state;
      }, 1000);//Tempo entre chamadas => 1000 millis = 1 segundo 
  
      //Chamado quando a conexão com o client é fechada
      client.on('close', () => {
          console.log("Conexão fechada");
          //Remove o intervalo de envio de estado
          clearInterval(interval);
      });
  });