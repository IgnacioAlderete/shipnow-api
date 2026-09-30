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

export const MOCKING_PARAMETERS = Object.freeze({
  MAX: 50,
  DEFAULT: 10,
  DEFAULT_PASSWORD: "coder123"
})

export const ORDER_STATUS = Object.freeze({
    CREATED: 'created',
    ASSIGNED: 'assigned',
    PICKED_UP: 'picked_up',
    IN_TRANSIT: 'in_transit',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled'
});

export const PRIORITY  = Object.freeze({
    LOW: 'low',
    NORMAL: 'normal',
    HIGH: 'high'
});

export const DELIVERY_STATUS = Object.freeze({
    PENDING: "pending",
    ASSIGNED: "assigned",
    IN_TRANSIT: "in_transit",
    DELIVERED: "delivered"
});