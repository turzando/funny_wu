const express = require('express')
const app = express()
const port = 8080
// const { client } = require('./repository')

let server

app.get('/health', (req, res) => {
    res.send("ok")
})

app.get('/', async (req, res) => {
    const limit = req.query.limit || 2
    const page = req.query.page || 1
    const offset = limit * (page - 1)
    const limitForNextPage = Number(limit) + 1

    const result = await client.query(`select * from persons order by id limit ${limitForNextPage} offset ${offset}`)

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

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received')
    console.log('Closing http server')
    server.close(() => {
        console.log('HTTP server closed')
        client.end()
        console.log('DB connection closed')
        process.exit()
    })
})

module.exports = app