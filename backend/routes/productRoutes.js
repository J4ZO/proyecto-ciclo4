import express from 'express';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';

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

productRouter.post(
    '/',
    expressAsyncHandler(async (req, res) => {
        const newProduct = new Product({
            name: 'sample name ' + Date.now(),
            slug: 'sample-name-' + Date.now(),
            image: '/images/GOWRagnarok.jpg',
            price: 0,
            inStock: 0,
            rating: 0,
            consoleAvailable: 'sample consoleAvailable',
            mode: 'sample mode',
            classification: 'sample classification',
        });
        const product = await newProduct.save();
        res.send({ message: 'Producto Creado', product });
    })
);

productRouter.get(
    '/products',
    expressAsyncHandler(async (req, res) => {
        const { query } = req;
        const page = query.page || 1;
        const pageSize = query.pageSize || PAGE_SIZE;

        const products = await Product.find()
            .skip(pageSize * (page - 1))
            .limit(pageSize);
        const countProducts = await Product.countDocuments();
        res.send({
            products,
            countProducts,
            page,
            pages: Math.ceil(countProducts / pageSize),
        });
    })
);

productRouter.post(
    '/newproducts',
    expressAsyncHandler(async (req, res) => {
        const newProduct = new Product({
            name: req.body.name,
            classification: req.body.classification,
            inStock: req.body.inStock,
            consoleAvailable: req.body.consoleAvailable,
            image: req.body.image,
            price: req.body.price,
            rating: req.body.rating,
            mode: req.body.mode,
            slug: req.body.slug,
        });
        const product = await newProduct.save();
        res.send({
            _id: product._id,
            name: product.name,
            classification: product.classification,
            inStock: product.inStock,
            consoleAvailable: product.consoleAvailable,
            image: product.image,
            price: product.price,
            rating: product.rating,
            mode: product.mode,
            slug: product.slug,

        });
    })
);



export default productRouter;