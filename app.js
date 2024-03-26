const express = require('express')
const app = express()
const port = 8080
const { client } = require('./repository')


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

app.get('/users', (req, res) => {
    const limit = req.query.limit || 3
    const offset = req.query.offset || 0

    res.send(pagenationWithoutSlice(limit, offset))
})

app.listen(port, () => {
    console.log(`App listeing on port ${port}`)
})

let list = []

let person1 = {"name": "Artur", "age": 22}
let person2 = {"name": "Art", "age": 21}
let person3 = {"name": "Tur", "age": 18}
let person4 = {"name": "Tony", "age": 25}
let person5 = {"name": "Xablau", "age": 5}

list.push(person1)
list.push(person2)
list.push(person3)
list.push(person4)
list.push(person5)

function pagenationWithSlice(limit, pageNumber) {
    let startIndex = pageNumber * limit
    let endIndex = startIndex + limit
    return list.slice(startIndex, endIndex)
}


function pagenationWithoutSlice(limit, pageNumber) {
    let startIndex = pageNumber * limit
    let endIndex = startIndex + limit
    
    paginatedList = []
    
    for (let i = 0; i < list.length; i++) {
        if (endIndex == i) {
          break  
        } else if (startIndex <= i) {
            paginatedList.push(list[i])
        }  
        if (paginatedList.length == limit) {
            break
        }
    }
    // rota -> banco

    // hasNext
    return {
        elements: paginatedList,
        pageNumber: pageNumber,
        totalOfElements: list.length
    }
}