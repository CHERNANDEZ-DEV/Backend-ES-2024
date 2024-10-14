const Product = require('../models/Product');

const createProduct = async(productData) => {
    const product = new Product(productData);
    return await product.save();
};

const findAllProducts = async () => {
    return await Product.find();
};

const findProductById = async (productId) => {
    return await Product.findById(productId);
};

const updateProduct = async (productId, productData) => {
    return await Product.findByIdAndUpdate(productId, productData, { new: true });
};

const deleteProduct = async (productId) => {
    return await Product.findByIdAndDelete(productId);
};

module.exports = {
    createProduct,
    findAllProducts,
    findProductById,
    updateProduct,
    deleteProduct
};