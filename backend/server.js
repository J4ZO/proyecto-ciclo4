import express from "express";
import data from './data.js';
const app = express(); // Retorna un objeto que es un express app

/* Recibe dos parametos, la url de la api y 
la funcion la cual nos va a traer en el front-end los elementos a mostrar*/
app.get('/api/products', (req, res) => {
    res.send(data.products);// Envia data al front-end
})

app.get('/api/products/slug/:slug', (req, res) => { // Nos traer el elemento por su identificador
    const product = data.products.find((x) => x.slug === req.params.slug); // Verifica si esta el objeto
    if (product) {
        res.send(product); // si lo es lo envia
    } else {
        res.status(404).send({ message: 'Producto no encontrado' }); // Sino marca un error
    }
});

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id); // Verifica si la id es correcta
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Producto no encontrado' });
    }
});

const port = process.env.PORT || 5000; // Se selecciona el puerto 5000, luego lo cambiamos

app.listen(port, () => {
    // Se prepara para escuchar, y recibe el puerto donde muestra que esta funcionando
    console.log(`El servidor corre en http://localhost:${port}`)
});