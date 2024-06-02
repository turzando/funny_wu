
class PersonRepository {
    constructor(db) {
        this.db = db
    }

    async getAllPersons() {
        const result = await this.db.query("SELECT * FROM persons")
        return result.rows
    }

    async getAllPersonsByRole(role) {
        const result = await this.db.query(`SELECT * FROM persons where role = '${role}'`)
        return result.rows
    }

    async getPersonsFromUsername(username) {
        const result = await this.db.query(`SELECT * FROM persons where username = '${username}'`)
        return result.rows
    }

    async savePerson(personInput) {
        const query = {
            text: 'INSERT INTO persons(full_name, first_name, last_name, username, email, role, password, birth_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);',
            values: [personInput.fullName, personInput.firstName, personInput.lastName, personInput.username, personInput.email, personInput.role, personInput.password, personInput.birthDate]
        }
        const createdPerson = await this.db.query(query)
        return createdPerson
    }
}

module.exports = PersonRepository