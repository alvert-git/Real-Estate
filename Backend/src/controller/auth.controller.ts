import type { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service.js';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = await AuthService.register(req.body);
      const token = AuthService.generateToken(newUser.id, newUser.role);

      res.status(201).json({ success: true, token, data: newUser });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);

      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }
}