module.exports = (app, subjectsRepository) => {
    app.get('/subjects', async (req, res) => {
        const subjects = await subjectsRepository.getAllSubjects()
        res.send(subjects)
    })
}