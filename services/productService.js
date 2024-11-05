const productRepository = require('../repositories/productRepository');

const createProduct = async (productData) => {
    return await productRepository.createProduct(productData);
};

const getAllProducts = async () => {
    return await productRepository.findAllProducts();
};

const getProductById = async (productId) => {
    const product = await productRepository.findProductById(productId);
    if(!product){
        throw new Error('Product not found');
    }
    return product;
};

const updateProduct = async (productId, productData) => {
    return await productRepository.updateProduct(productId, productData);
};

const deleteproduct = async (productId) => {
    return await productRepository.deleteProduct(productId);
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteproduct
};