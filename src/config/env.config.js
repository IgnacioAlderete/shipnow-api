import dotenv from "dotenv";
import { ENVIRONMENTS } from "../constants/index.js";

dotenv.config();

const requireEnv = (name) => {
    const value = process.env[name];
    if (!value || value.trim() === "") {
        throw new Error(`Falta la variable ${name} en el archivo .env`);
    }
    return value.trim();
};

const buildConfig = () => {
    const mongoUri = requireEnv("MONGODB_URI");
    if (!mongoUri.startsWith("mongodb://") && !mongoUri.startsWith("mongodb+srv://")) {
        throw new Error("MONGODB_URI debe comenzar con mongodb:// o mongodb+srv://");
    }

    const port = Number(requireEnv("PORT"));
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error("PORT debe ser un número entero entre 1 y 65535");
    }

    const environment = requireEnv("NODE_ENV");
    if (!Object.values(ENVIRONMENTS).includes(environment)) {
        throw new Error(`NODE_ENV debe ser uno de: ${Object.values(ENVIRONMENTS).join(", ")}`);
    }

    return Object.freeze({
        port,
        mongoUri,
        environment,
        // Opcional por ahora: se validará cuando se implemente autenticación
        jwtSecret: process.env.JWT_SECRET
    });
};

const config = buildConfig();

export default config;
