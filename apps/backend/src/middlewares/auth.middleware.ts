import { Request, Response, NextFunction } from "express";
import {verifyToken} from "../utils/jwt";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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
        const decoded = verifyToken(token) as any;
        console.log("Token decoded successfully:", decoded);
        
        req.userId = decoded.userId;
        console.log("Set req.userId to:", req.userId);
        
        next();
    } catch (error) {
        console.log("ERROR: Token verification failed:", error);
        res.sendStatus(401);
    }
};
