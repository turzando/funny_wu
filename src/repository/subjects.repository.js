
class SubjectsRepository {
    constructor(db) {
        this.db = db
    }

    async getAllSubjects() {
        const result = await this.db.query("SELECT * FROM subjects")
        return result.rows
    }
}

module.exports = SubjectsRepository