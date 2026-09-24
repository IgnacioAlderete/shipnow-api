import productRepository from "../repositories/products.repository.js";
import { PRODUCT_STATUS } from "../constants/index.js";

class ProductService {

    async getAll() {

        const products = await productRepository.getAll();

        return products.filter(
            product =>
                product.status === PRODUCT_STATUS.AVAILABLE &&
                product.stock > 0
        );
    }

    async getById(id) {
        return await productRepository.getById(id);
    }

    async create(data) {

        if (data.price < 0) {
            throw new Error("Precio inválido");
        }

        return await productRepository.create(data);
    }
}

export default new ProductService;