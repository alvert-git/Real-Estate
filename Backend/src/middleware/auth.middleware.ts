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
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next();
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const [rows]: any = await pool.query('SELECT id, role FROM users WHERE id = ?', [decoded.id]);

    if (rows.length > 0) {
      req.user = rows[0];
    }

    next();
  } catch (error) {
    next();
  }
};
