import { Request, Response, NextFunction } from "express";
import {verifyToken} from "../utils/jwt";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    
    const token = authHeader?.split(" ")[1];
    
    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const decoded = verifyToken(token) as any;
        
        req.userId = decoded.userId;
        
        next();
    } catch (error) {
        res.sendStatus(401);
    }
};
