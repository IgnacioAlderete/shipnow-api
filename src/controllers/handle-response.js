import { HTTP_STATUS, RESPONSE_STATUS } from "../constants/index.js";

export const sendSuccess = (res, payload, statusCode = HTTP_STATUS.OK) =>
    res.status(statusCode).json({ status: RESPONSE_STATUS.SUCCESS, payload });

export const sendError = (res, error) => {
    const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.statusCode ? error.message : "Error interno del servidor";
    return res.status(statusCode).json({ status: RESPONSE_STATUS.ERROR, message });
};
