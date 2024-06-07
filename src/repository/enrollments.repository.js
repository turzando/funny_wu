
class EnrollmentsRepository {
    constructor(db) {
        this.db = db
    }

    async getAllEnrollments() {
        const result = await this.db.query("SELECT * FROM enrollments")
        return result.rows
    }
}

module.exports = EnrollmentsRepository