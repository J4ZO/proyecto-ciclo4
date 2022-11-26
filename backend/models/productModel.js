import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: { type: String },
        classification: { type: String },
        inStock: { type: Number },
        consoleAvailable: { type: String },
        image: { type: String },
        price: { type: Number },
        rating: { type: Number },
        mode: { type: String },
        slug: { type: String, unique: true }

    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
