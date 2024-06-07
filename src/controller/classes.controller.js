module.exports = (app, classesRepository) => {
    app.get('/classes', async (req, res) => {
        const classes = await classesRepository.getAllClasses()
        res.send(classes)
    })
}