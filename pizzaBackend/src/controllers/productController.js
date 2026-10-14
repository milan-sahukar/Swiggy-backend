const { createProduct, getProductById, deleteProductById } = require('../service/productService');
const AppError = require('../utils/appError');
async function addProduct (req, res)  {

    console.log("Received body:", req.body); // Check if body is received
        console.log("Received file:", req.file); // Check if file is received

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image file is required",
                error: {},
            });
        }

    try {
        const product = await createProduct({
        productName: req.body.productName,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        imagePath: req.file?.path,
        inStock: req.body.inStock
    });

    return res.status(200).json({
        success: true,
        message: "Product created successfully",
        data: product,
        error: {}
    })
    } catch (error) {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success: false,
                message: error.reason,
                data: {},
                error: error,
            })
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error: error,
        })
    }

    
}

async function getProduct(req, res){
    try {
        const response = await getProductById(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: response,
            error: {}
        })
    } catch (error) {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success: false,
                message: error.reason,
                data: {},
                error: error,
            })
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error: error,
        })
    }
}

async function deleteProduct(req, res){
    try {
        const response = await deleteProductById(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Successfully deleted the product",
            data: response,
            error: {}
        })
    } catch (error) {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success: false,
                message: error.reason,
                data: {},
                error: error,
            })
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error: error,
        })
    }
}

module.exports = {
    addProduct,
    getProduct,
    deleteProduct
}