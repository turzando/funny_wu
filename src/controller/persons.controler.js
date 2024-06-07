
const Person = require('../entity/person.entity')

module.exports = (app, personsRepository) => {
    app.get('/persons', async (req, res) => {
        const persons = await personsRepository.getAllPersons()
        res.send(persons)
    })

    app.get('/persons/:username', async (req, res) => {
        const username = req.params.username
        const user = await personsRepository.getPersonsFromUsername(username)
        res.send(user)
    })

    app.get('/persons/role/:role', async (req, res) => {
        const role = req.params.role?.toUpperCase()
        const users = await personsRepository.getAllPersonsByRole(role)
        res.send(users)
    })

    app.post('/persons', async (req, res) => {
        const body = req.body
        const names = body.fullName.split(" ")
        const person = new Person(body.fullName, names[0], names.pop(), body.username, body.email, body.role, body.password, body.birthDate)
        personsRepository.savePerson(person)
        res.send('ok')
    })

    app.put('/users', (req, res) => {
        res.send('ATUALIZAR USUARIO')
    })

    app.delete('/users', (req, res) => {
        res.send('DELETAR USUARIO')
    })
}