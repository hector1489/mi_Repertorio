require('dotenv').config()
const express = require('express')
const crud = require('./crud')
const fs = require('fs');

const PORT = process.env.PORT ?? 3000
const app = express()

// Middleware
app.use(express.json())

app.get('/', (_, res) => {
    const file = fs.readFileSync('./public/index.html', 'utf-8')
    res.status(200).end(file)
})

// Rutas para CRUD de canciones

app.post('/canciones', (req, res) => {
    const newCancion = req.body
    crud.createCancion(newCancion)
    res.send('Canción creada con éxito!')
})

app.get('/canciones', (req, res) => {
    const canciones = crud.readCanciones()
    res.json(canciones)
})

app.get('/canciones/:id', (req, res) => {
    const cancionId = req.params.id
    const cancion = crud.readCancion(cancionId)
    if (cancion) {
        res.json(cancion)
    } else {
        res.status(404).json({ code: 404, message: 'Canción no encontrada' })
    }
})

app.put('/canciones/:id', (req, res) => {
    const cancionId = req.params.id
    const updatedCancion = req.body
    crud.updateCancion(cancionId, updatedCancion)
    res.send('Canción actualizada con éxito!')
})

app.delete('/canciones/:id', (req, res) => {
    const cancionId = req.params.id
    crud.deleteCancion(cancionId)
    res.send('Canción eliminada con éxito!')
})

// Ruta por defecto
app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'La ruta no existe' }))

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
