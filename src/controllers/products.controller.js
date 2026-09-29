import productService from "../services/products.service.js";
import { HTTP_STATUS } from "../constants/index.js";
import { sendSuccess, sendError } from "./handle-response.js";

export const getProducts = async (req, res) => {
    try {
        sendSuccess(res, await productService.getProducts());
    } catch (error) {
        sendError(res, error);
    }
};

export const getProductById = async (req, res) => {
    try {
        sendSuccess(res, await productService.getProductById(req.params.id));
    } catch (error) {
        sendError(res, error);
    }
};

export const createProduct = async (req, res) => {
    try {
        sendSuccess(res, await productService.createProduct(req.body), HTTP_STATUS.CREATED);
    } catch (error) {
        sendError(res, error);
    }
};

export const updateProduct = async (req, res) => {
    try {
        sendSuccess(res, await productService.updateProduct(req.params.id, req.body));
    } catch (error) {
        sendError(res, error);
    }
};

export const deleteProduct = async (req, res) => {
    try {
        sendSuccess(res, await productService.deleteProduct(req.params.id));
    } catch (error) {
        sendError(res, error);
    }
};
