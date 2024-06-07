module.exports = (app, enrollmentsRepository) => {
    app.get('/enrollments', async (req, res) => {
        const enrollments = await enrollmentsRepository.getAllEnrollments()
        res.send(enrollments)
    })
}