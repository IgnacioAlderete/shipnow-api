import userService from "../services/users.service.js";
import { HTTP_STATUS } from "../constants/index.js";
import { sendSuccess, sendError } from "./handle-response.js";

export const getUsers = async (req, res) => {
    try {
        sendSuccess(res, await userService.getUsers());
    } catch (error) {
        sendError(res, error);
    }
};

export const getUserById = async (req, res) => {
    try {
        sendSuccess(res, await userService.getUserById(req.params.id));
    } catch (error) {
        sendError(res, error);
    }
};

export const createUser = async (req, res) => {
    try {
        sendSuccess(res, await userService.createUser(req.body), HTTP_STATUS.CREATED);
    } catch (error) {
        sendError(res, error);
    }
};

export const updateUser = async (req, res) => {
    try {
        sendSuccess(res, await userService.updateUser(req.params.id, req.body));
    } catch (error) {
        sendError(res, error);
    }
};

export const deleteUser = async (req, res) => {
    try {
        sendSuccess(res, await userService.deleteUser(req.params.id));
    } catch (error) {
        sendError(res, error);
    }
};
