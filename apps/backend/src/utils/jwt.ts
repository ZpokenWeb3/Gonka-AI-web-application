import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-jwt-secret-change-me-in-production";

export const signToken = (payload: object) =>
    jwt.sign(payload, JWT_SECRET, {
        expiresIn: "7d",
    });

export const verifyToken = (token: string) =>
    jwt.verify(token, JWT_SECRET);
