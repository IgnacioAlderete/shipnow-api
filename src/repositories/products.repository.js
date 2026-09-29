import mongoose from "mongoose";
import Product from "../models/product.model.js";

class ProductRepository {
    async getAll() {
        return await Product.find();
    }

    async getById(id) {
        if (!mongoose.isValidObjectId(id)) return null;
        return await Product.findById(id);
    }

    async getByCode(code) {
        return await Product.findOne({ code });
    }

    async create(productData) {
        return await Product.create(productData);
    }

    async update(id, productData) {
        if (!mongoose.isValidObjectId(id)) return null;
        return await Product.findByIdAndUpdate(id, productData, { new: true, runValidators: true });
    }

    async delete(id) {
        if (!mongoose.isValidObjectId(id)) return null;
        return await Product.findByIdAndDelete(id);
    }
}

export default new ProductRepository();
