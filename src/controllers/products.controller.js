import  productService  from "../services/products.service.js";

export const getProducts = async (req, res) => {

    try {

        const products = await productService.getAll();

        res.status(200).json({
            status: "success",
            payload: products
        });

    } catch (error) {

        res.status(500).json({
            status: "error",
            message: error.message
        });

    }
};


export const getProductById = async (req, res) => {

    try {

        const { id } = req.params;

        const product = await productService.getProductById(id);

        res.status(200).json({
            status: "success",
            payload: product
        });

    } catch (error) {

        res.status(404).json({
            status: "error",
            message: error.message
        });

    }
};


export const createProduct = async (req, res) => {

    try {

        const product = await productService.createProduct(req.body);

        res.status(201).json({
            status: "success",
            payload: product
        });

    } catch (error) {

        res.status(400).json({
            status: "error",
            message: error.message
        });

    }
};


export const updateProduct = async (req, res) => {

    try {

        const { id } = req.params;

        const product = await productService.updateProduct(id, req.body);

        res.status(200).json({
            status: "success",
            payload: product
        });

    } catch (error) {

        res.status(404).json({
            status: "error",
            message: error.message
        });

    }
};


export const deleteProduct = async (req, res) => {

    try {

        const { id } = req.params;

        const product = await productService.deleteProduct(id);

        res.status(200).json({
            status: "success",
            payload: product
        });

    } catch (error) {

        res.status(404).json({
            status: "error",
            message: error.message
        });

    }
};