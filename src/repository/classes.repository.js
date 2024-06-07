
class ClassesRepository {
    constructor(db) {
        this.db = db
    }

    async getAllClasses() {
        const result = await this.db.query("SELECT * FROM classes")
        return result.rows
    }
}

module.exports = ClassesRepository