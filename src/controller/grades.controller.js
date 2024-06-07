module.exports = (app, gradesRepository) => {
    app.get('/grades/:enrollment', async (req, res) => {
        const enrollment = req.params.enrollment
        const grades = await gradesRepository.getGradesByEnrollment(enrollment)
        res.send(grades)
    })

    
}