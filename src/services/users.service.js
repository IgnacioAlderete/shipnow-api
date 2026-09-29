import userRepository from "../repositories/users.repository.js";
import { USER_ROLES, HTTP_STATUS } from "../constants/index.js";
import { AppError } from "../errors/app.error.js";

const REQUIRED_FIELDS = Object.freeze(["firstName", "lastName", "email", "password"]);

class UserService {
    async getUsers() {
        return await userRepository.getAll();
    }

    async getUserById(id) {
        const user = await userRepository.getById(id);
        if (!user) {
            throw new AppError("Usuario no encontrado", HTTP_STATUS.NOT_FOUND);
        }
        return user;
    }

    async createUser(userData) {
        for (const field of REQUIRED_FIELDS) {
            if (!userData[field]) {
                throw new AppError(`Falta el campo ${field}`, HTTP_STATUS.BAD_REQUEST);
            }
        }

        this.#assertNotAdmin(userData.role);

        const existing = await userRepository.getByEmail(userData.email);
        if (existing) {
            throw new AppError("El usuario ya existe", HTTP_STATUS.CONFLICT);
        }

        const { firstName, lastName, email, password, role } = userData;
        return await userRepository.create({
            firstName,
            lastName,
            email,
            password,
            role: role || USER_ROLES.USER
        });
    }

    async updateUser(id, userData) {
        this.#assertNotAdmin(userData.role);

        const user = await userRepository.update(id, userData);
        if (!user) {
            throw new AppError("Usuario no encontrado", HTTP_STATUS.NOT_FOUND);
        }
        return user;
    }

    async deleteUser(id) {
        const user = await userRepository.delete(id);
        if (!user) {
            throw new AppError("Usuario no encontrado", HTTP_STATUS.NOT_FOUND);
        }
        return user;
    }

    #assertNotAdmin(role) {
        if (role === USER_ROLES.ADMIN) {
            throw new AppError(
                "No se puede asignar el rol admin desde este endpoint",
                HTTP_STATUS.FORBIDDEN
            );
        }
    }
}

export default new UserService();
