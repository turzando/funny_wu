const personsController = require('./src/controller/persons.controler');
const PersonsRepository = require('./src/repository/persons.repository')
const express = require('express')
const app = express()
app.use(express.json())
const PORT = 8080
let server
const { client } = require('./src/repository/repository')

// app.db = client
const personsRepository = new PersonsRepository(client)
personsController(app, personsRepository)

app.get('/health', (req, res) => {
    res.send("ok")
})

app.get('/', (req, res) => {
    res.send("hello world")
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received')
    console.log('Closing http server')
    server.close(() => {
        console.log('HTTP server closed')
        client.end()
        console.log('DB connection closed')
        process.exit()
    })
})

module.exports = app