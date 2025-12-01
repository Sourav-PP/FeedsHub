import dotenv from "dotenv";
dotenv.config();

function required(name: string, value?: string): string {
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export const config = {
    client: {
        uri: required("CLIENT_URL", process.env.CLIENT_URL),
    },
    server: {
        port: process.env.PORT || 4000,
    },
    database: {
        mongoDb: required("MONGO_URL", process.env.MONGO_URL),
    },
    jwt: {
        accessTokenSecret: required("ACCESS_TOKEN_SECRET", process.env.ACCESS_TOKEN_SECRET),
        refreshTokenSecret: required("REFRESH_TOKEN_SECRET", process.env.REFRESH_TOKEN_SECRET),
        accessTokenExpiresIn: required("ACCESS_EXPIRE_IN", process.env.ACCESS_EXPIRE_IN),
        refreshTokenExpiresIn: required("REFRESH_EXPIRE_IN", process.env.REFRESH_EXPIRE_IN),
    },
    cloudinary: {
        cloudName: required("CLOUDINARY_CLOUD_NAME", process.env.CLOUDINARY_CLOUD_NAME),
        apiKey: required("CLOUDINARY_API_KEY", process.env.CLOUDINARY_API_KEY),
        apiSecret: required("CLOUDINARY_API_SECRET", process.env.CLOUDINARY_API_SECRET),
        root: required("CLOUDINARY_ROOT", process.env.CLOUDINARY_ROOT),
    },
    environment: process.env.NODE_ENV,
};
