"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("=== AUTH MIDDLEWARE DEBUG ===");
    console.log("Auth header:", authHeader);
    const token = authHeader?.split(" ")[1];
    console.log("Extracted token:", token ? "present" : "missing");
    if (!token) {
        console.log("ERROR: No token provided");
        return res.sendStatus(401);
    }
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        console.log("Token decoded successfully:", decoded);
        req.userId = decoded.userId;
        console.log("Set req.userId to:", req.userId);
        next();
    }
    catch (error) {
        console.log("ERROR: Token verification failed:", error);
        res.sendStatus(401);
    }
};
exports.authMiddleware = authMiddleware;
