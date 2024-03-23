const express = require('express')
const { readData, writeData } = require('./functions')
require('dotenv').config()
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001

app.use(bodyParser.json()) // middleware 


// DISHES

app.get('/dishes', (req, res) => {
    const data = readData()
    res.json(data.dishes)
})

app.post('/dishes', (req, res) => {
    const data = readData() // leer el archivo
    const dish = req.body; // obtengo el contenido del body
    const newDish = {
        id: data.dishes.length + 1,
        ...dish
    }
    data.dishes.push(newDish) // agregamos el nuevo plato al arreglo de platos
    writeData(data)
    res.json(newDish)
})

app.put('/dishes/:id', (req, res) => { // id 1
    const data = readData()
    const body = req.body
    const id = parseInt(req.params.id) // transforma el id que se captura como string desde los parametros y lo transforma a int
    const dishIndex = data.dishes.findIndex(dish => dish.id === id) // retorna 0
    data.dishes[dishIndex]  = {  // data.dishes[0]
        id,
        ...body
    }
    writeData(data)
    res.json({ message: "El plato fue actualizado correctamente"})    
})


app.delete("/dishes/:id", (req, res) => {
    const data = readData()
    const id = parseInt(req.params.id)
    const dishIndex = data.dishes.findIndex(dish => dish.id === id)
    data.dishes.splice(dishIndex, 1);
    writeData(data)
    res.json({ message: "El plato fue eliminado exitosamente" })
})


// BOOKS

app.get('/testing', (req, res) => {
    
    res.json({message: 'Testeando la API'});
})

app.get('/books', (req, res) => {
    const data = readData()
    res.json(data.books);
})

app.post('/books', (req, res) => {
    const data = readData() // leer el archivo
    const book = req.body; // obtengo el contenido del body
    const newBook = {
        id: data.books.length + 1,
        ...book
    }
    data.books.push(newBook) // agregamos el nuevo plato al arreglo de platos
    writeData(data)
    res.json(newBook)
})

app.put('/books/:id', (req, res) => { // id 1
    const data = readData()
    const body = req.body
    const id = parseInt(req.params.id) // transforma el id que se captura como string desde los parametros y lo transforma a int
    const bookIndex = data.books.findIndex(book => book.id === id) // retorna 0
    data.books[bookIndex]  = {  // data.books[0]
        id,
        ...body
    }
    writeData(data)
    res.json({ message: "El libro fue actualizado correctamente"})    
})

app.delete("/books/:id", (req, res) => {
    const data = readData()
    const id = parseInt(req.params.id)
    const bookIndex = data.books.findIndex(book => book.id === id)
    data.books.splice(bookIndex, 1);
    writeData(data)
    res.json({ message: "El libro fue eliminado exitosamente" })
})


app.get('/', (req, res) => {
    res.send('Welcome to my API with Node JS')
})

app.listen(port, () => {
    console.log(`El servidor esta corriendo en el puerto ${port}`)
})

// http://localhost:3000/

// {
//     "id": 2, -> se genera con el largo del arrreglo + 1
//     "name": "Empanadas", -> se obtiene desde el body de la peticion
//     "origen": "Chile"    -> se obtiene desde el body de la peticion
// }


// EJERCICIO 2

// CREAR UNA RUTA POST PARA AGREGAR UN NUEVO OBJETO AL ARREGLO
// CONFIGURAR LA PETICION DE TIPO POST CON EL BODY CORRESPONDIENTE
// PROBAR QUE SE HAYA AGREGADO EL NUEVO OBJETO CONSULTANDO EL CONTENIDO DEL ARCHIVO
