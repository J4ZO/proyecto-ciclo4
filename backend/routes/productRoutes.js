import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products); // Envia data al front-end
});

productRouter.get("/slug/:slug", async (req, res) => {
    const product = await Product.findOne({ slug: { $eq: req.params.slug } }); // Verifica si esta el objeto
    if (product) {
        res.send(product); // si lo es los envia
    } else {
        res.status(404).send({ message: "Producto no encontrado" });
    }
});
productRouter.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id); // Verifica si la id es correcta
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Producto no encontrado' });
    }
});


export default productRouter;