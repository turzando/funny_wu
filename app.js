const personsController = require('./src/controller/persons.controler');
const PersonsRepository = require('./src/repository/persons.repository')

const subjectsController = require('./src/controller/subjects.controller')
const SubjectsRepository = require('./src/repository/subjects.repository')

const classesController = require('./src/controller/classes.controller')
const ClassesRepository = require('./src/repository/classes.repository')

const enrollmentsController = require('./src/controller/enrollments.controller')
const EnrollmentsRepository = require('./src/repository/enrollments.repository')

const gradesController = require('./src/controller/grades.controller')
const GradesRepository = require('./src/repository/grades.repository')

const express = require('express')
const app = express()
app.use(express.json())
const PORT = 8080
let server
const { client } = require('./src/repository/db')

// app.db = client
const personsRepository = new PersonsRepository(client)
personsController(app, personsRepository)

const subjectsRepository = new SubjectsRepository(client)
subjectsController(app, subjectsRepository)

const classesRepository = new ClassesRepository(client)
classesController(app, classesRepository)

const enrollmentsRepository = new EnrollmentsRepository(client)
enrollmentsController(app, enrollmentsRepository)

const gradesRepository = new GradesRepository(client)
gradesController(app, gradesRepository)

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