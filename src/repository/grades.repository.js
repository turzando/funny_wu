
class GradesRepository {
    constructor(db) {
        this.db = db
    }

    async getGradesByEnrollment(enrollment) {
        const result = await this.db.query(`SELECT * FROM grades as g INNER JOIN subjects as s 
            on g.subject_id = s.subject_id where enrollment_id = ${enrollment}`)
        return result.rows
    }
}

module.exports = GradesRepository