import express, { Request, Response, NextFunction } from "express";
import {auth} from '../config/firebaseConfig';

export const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if(!authorization || !authorization.startsWith('Bearer')) {
        return res.status(401).json({
            message: "Unauthorized: no token!"
        });
        return;
    }

    const token = authorization.split(' ')[1];

    try {
        const decodedToken = await auth.verifyIdToken(token);
        (req as any).user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized: invalid token!"
        });
    }
}