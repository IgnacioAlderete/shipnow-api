import UserRepository  from "../repositories/users.repository.js";

const userRepository = new UserRepository();

class UserService {

    async getAllUsers() {
        return await userRepository.getAll();
    }

    async getUserById(id) {
        const user = await userRepository.getById(id);

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        return user;
    }

    async createUser(userData) {
        // Acá iría la lógica de negocio

        return await userRepository.create(userData);
    }

    async updateUser(id, userData) {
        const user = await userRepository.update(id, userData);

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        return user;
    }

    async deleteUser(id) {
        const user = await userRepository.delete(id);

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        return user;
    }
}
export default UserService