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


let limit = 3
let pageNumber = 0

console.log(pagenationWithoutSlice(limit, pageNumber))

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