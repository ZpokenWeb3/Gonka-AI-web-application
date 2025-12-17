import { Request, Response, NextFunction } from "express";
import {verifyToken} from "../utils/jwt";


export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.sendStatus(401);

    try {
        (req as any).user = verifyToken(token);
        next();
    } catch {
        res.sendStatus(401);
    }
};
