import dotenv from "dotenv";

dotenv.config();

const validateEnv = () => {

    // MONGODB_URI
    if (!process.env.MONGODB_URI) {
        throw new Error(
            "Falta la variable MONGODB_URI en el archivo .env"
        );
    }

    if (
        !process.env.MONGODB_URI.startsWith("mongodb://") &&
        !process.env.MONGODB_URI.startsWith("mongodb+srv://")
    ) {
        throw new Error(
            "MONGODB_URI debe comenzar con mongodb:// o mongodb+srv://"
        );
    }

    // JWT_SECRET
    if (!process.env.JWT_SECRET) {
        throw new Error(
            "Falta la variable JWT_SECRET en el archivo .env"
        );
    }

    // PORT
    if (!process.env.PORT) {
        throw new Error(
            "Falta la variable PORT en el archivo .env"
        );
    }

    const port = Number(process.env.PORT);

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error(
            "PORT debe ser un número entero entre 1 y 65535"
        );
    }

    // NODE_ENV
    const validEnvironments = [ "development", "production", "test"
    ];

    if (!process.env.NODE_ENV) {
        throw new Error(
            "Falta la variable NODE_ENV en el archivo .env"
        );
    }

    if (!validEnvironments.includes(process.env.NODE_ENV)) {
        throw new Error(
            "NODE_ENV debe ser uno de: development, production o test"
        );
    }
};

validateEnv();

const config = {
    port: Number(process.env.PORT),
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    environment: process.env.NODE_ENV
};

export default config;

