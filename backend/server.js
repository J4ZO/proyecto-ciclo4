import express from "express";
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';

dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI) // Se conecta a la base de datos
    .then(() => {
        console.log('Se conecto a la base de datos');
    })
    .catch((err) => {
        console.log(err.message);
    });
const app = express(); // Retorna un objeto que es un express app
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Convierte el formulario en un archivo json


app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});
const port = process.env.PORT || 5000; // Se selecciona el puerto 5000, luego lo cambiamos

app.listen(port, () => {
    // Se prepara para escuchar, y recibe el puerto donde muestra que esta funcionando
    console.log(`El servidor corre en http://localhost:${port}`)
});