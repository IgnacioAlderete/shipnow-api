import mongoose from "mongoose";
import User from "../models/user.model.js";

// Nunca se devuelve el password fuera del repository
const SAFE_FIELDS = "-password";

class UserRepository {
    async getAll() {
        return await User.find().select(SAFE_FIELDS);
    }

    async getById(id) {
        if (!mongoose.isValidObjectId(id)) return null;
        return await User.findById(id).select(SAFE_FIELDS);
    }

    async getByEmail(email) {
        return await User.findOne({ email: String(email).toLowerCase().trim() }).select(SAFE_FIELDS);
    }

    async create(userData) {
        const user = await User.create(userData);
        const { password, ...safeUser } = user.toObject();
        return safeUser;
    }

    async update(id, userData) {
        if (!mongoose.isValidObjectId(id)) return null;
        return await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true })
            .select(SAFE_FIELDS);
    }

    async delete(id) {
        if (!mongoose.isValidObjectId(id)) return null;
        return await User.findByIdAndDelete(id).select(SAFE_FIELDS);
    }
}

export default new UserRepository();
