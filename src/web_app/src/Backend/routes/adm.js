const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const sqlite = require("sqlite")
const bodyParser = require("body-parser")
const Routes = express.Router()

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

Routes.get("/dispositivos", (req, res) => {
    async function getDB() {
        const db = await sqlite.open({filename: "./Backend/database/dispositivos.db", driver: sqlite3.Database })
        let dispositivo = []
        const infos = await db.all("SELECT * FROM objetos")
    }
})