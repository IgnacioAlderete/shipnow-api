import productRepository from "../repositories/products.repository.js";
import { PRODUCT_STATUS, HTTP_STATUS } from "../constants/index.js";
import { AppError } from "../errors/app.error.js";

class ProductService {
    // Solo se listan los productos disponibles y con stock
    async getProducts({ status, category, available } = {}) {
        const filters = {};

        if (status !== undefined) {
            if (!Object.values(PRODUCT_STATUS).includes(status)) {
                throw new AppError(
                    `Estado inválido. Valores permitidos: ${Object.values(PRODUCT_STATUS).join(", ")}`,
                    HTTP_STATUS.BAD_REQUEST
                );
            }
            filters.status = status;
        }

        if (category !== undefined) {
            if (typeof category !== "string") {
                throw new AppError("Categoría inválida", HTTP_STATUS.BAD_REQUEST);
            }
            filters.category = category;
        }

        if (available === "true") {
            filters.status = filters.status ?? PRODUCT_STATUS.AVAILABLE;
            filters.inStock = true;
        }

        return await productRepository.getAll(filters)
    }

    async getProductById(id) {
        const product = await productRepository.getById(id);
        if (!product) {
            throw new AppError("Producto no encontrado", HTTP_STATUS.NOT_FOUND);
        }
        return product;
    }

    async createProduct(data) {
        if (data.price < 0) {
            throw new AppError("Precio inválido", HTTP_STATUS.BAD_REQUEST);
        }

        const existing = await productRepository.getByCode(data.code);
        if (existing) {
            throw new AppError("Ya existe un producto con ese código", HTTP_STATUS.CONFLICT);
        }

        return await productRepository.create(this.#withStatusFromStock(data));
    }

    async updateProduct(id, data) {
        const product = await productRepository.update(id, this.#withStatusFromStock(data));
        if (!product) {
            throw new AppError("Producto no encontrado", HTTP_STATUS.NOT_FOUND);
        }
        return product;
    }

    async deleteProduct(id) {
        const product = await productRepository.delete(id);
        if (!product) {
            throw new AppError("Producto no encontrado", HTTP_STATUS.NOT_FOUND);
        }
        return product;
    }

    // Regla de negocio: el estado se deriva del stock
    #withStatusFromStock(data) {
        if (data.stock === undefined) return data;
        return {
            ...data,
            status: Number(data.stock) > 0 ? PRODUCT_STATUS.AVAILABLE : PRODUCT_STATUS.OUT_OF_STOCK
        };
    }
}

export default new ProductService();
