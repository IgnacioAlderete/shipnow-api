import productRepository from "../repositories/products.repository.js";
import { PRODUCT_STATUS } from "../constants/index.js";

class ProductService {

    async getProducts() {

        const products = await productRepository.getProducts();

        return products.filter(
            product =>
                product.status === PRODUCT_STATUS.AVAILABLE &&
                product.stock > 0
        );
    }

    async getProductById(id) {
        return await productRepository.getById(id);
    }

    async createProduct(data) {

        if (data.price < 0) {
            throw new Error("Precio inválido");
        }

        return await productRepository.create(data);
    }
      async updateProduct(id, data) {
        const product = await productRepository.update(id, data);

        if (!product) {
            throw new Error("Producto no encontrado");
        }

        return product;
    }

    async deleteProduct(id) {
        const product = await productRepository.delete(id);

        if (!product) {
            throw new Error("Producto no encontrado");
        }

        return product;
    }

}

export default new ProductService;