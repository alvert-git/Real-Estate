import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import pool from "../config/database.js";


export const protect = async (req: any, res: Response, next: NextFunction) => {
  try {
    let token = req.headers.authorization?.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null;

    if (!token)
      return next(new AppError("Please log in to access this route", 401));

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    next(new AppError("Invalid token", 401));
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission (Agents only)", 403),
      );
    }
    next();
  };
};

export const decodeUserIfLoggedIn = async (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return next(); 
    }

    const token = authHeader.split(' ')[1];
    if (!token) return next();

    // Verify token - ensure JWT_SECRET is set in Vercel!
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    if (decoded) {
      req.user = { id: decoded.id, role: decoded.role };
    }

    next();
  } catch (error) {
    // If token is expired or invalid, just treat them as a guest
    console.log("JWT Decode failed, continuing as guest");
    next();
  }
};
