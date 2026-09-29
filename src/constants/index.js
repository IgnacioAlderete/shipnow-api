export const PRODUCT_STATUS = Object.freeze({
    AVAILABLE: "available",
    OUT_OF_STOCK: "out_of_stock"
});

export const USER_ROLES = Object.freeze({
    ADMIN: "admin",
    USER: "user"
});

export const ENVIRONMENTS = Object.freeze({
    DEVELOPMENT: "development",
    PRODUCTION: "production",
    TEST: "test"
});

export const HTTP_STATUS = Object.freeze({
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
});

export const RESPONSE_STATUS = Object.freeze({
    SUCCESS: "success",
    ERROR: "error"
});
