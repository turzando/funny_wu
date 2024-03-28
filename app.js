const express = require('express')
const app = express()
const port = 8080
const { client } = require('./repository')


app.get('/health', (req, res) => {
    res.send("ok")
})

app.get('/', async (req, res) => {
    const limit = req.query.limit || 2
    const offset = req.query.offset || 0
    const page = limit * offset
    const limitForNextPage = Number(limit) + 1

    const result = await client.query(`select * from persons order by id limit ${limitForNextPage} offset ${page}`)

    let hasNext = false

    if (result.rows.length == limitForNextPage) {
        hasNext = true
        result.rows.pop()
    }
    return res.send({
        elements: result.rows,
        hasNext: hasNext
    })
})

app.listen(port, () => {
    console.log(`App listeing on port ${port}`)
})