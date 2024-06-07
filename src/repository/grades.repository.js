
class GradesRepository {
    constructor(db) {
        this.db = db
    }

    async getGradesByEnrollment(enrollment) {
        const result = await this.db.query(`SELECT * FROM grades where enrollment_id = ${enrollment}`)
        return result.rows
    }
}

module.exports = GradesRepository