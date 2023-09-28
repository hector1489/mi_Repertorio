const fs = require('fs')
const path = require('path')

const getCanciones = () => JSON.parse(fs.readFileSync('./db/repertorio.json', 'utf-8'))

const setCanciones = (canciones) => fs.writeFileSync('./db/repertorio.json', JSON.stringify(canciones, null, 2), 'utf-8')

const createCancion = (newCancion) => {
    const canciones = getCanciones()
    canciones.push(newCancion)
    setCanciones(canciones)
}

const readCancion = (cancionId) => {
    const canciones = getCanciones()
    return canciones.find(cancion => cancion.id == cancionId)
}

const readCanciones = () => getCanciones()

const updateCancion = (cancionId, updatedCancion) => {
    const canciones = getCanciones()
    const index = canciones.findIndex(cancion => cancion.id == cancionId)
    if (index !== -1) {
        canciones[index] = { ...canciones[index], ...updatedCancion }
        setCanciones(canciones)
    }
}

const deleteCancion = (cancionId) => {
    const canciones = getCanciones()
    const updatedCanciones = canciones.filter(cancion => cancion.id != cancionId)
    setCanciones(updatedCanciones)
}

module.exports = {
    createCancion,
    readCancion,
    readCanciones,
    updateCancion,
    deleteCancion
}
