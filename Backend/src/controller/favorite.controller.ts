import type { Request, Response, NextFunction } from 'express';
import { FavoriteService } from '../services/favorite.service.js';

export class FavoriteController {
  static async toggleFavorite(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const propertyId = Number(req.params.propertyId);

      const result = await FavoriteService.toggle(userId, propertyId);

      res.status(200).json({
        success: true,
        message: `Property ${result.action} to favorites`,
        action: result.action
      });
    } catch (error) {
      next(error);
    }
  }

  static async getFavorites(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const favorites = await FavoriteService.getMyFavorites(userId);

      res.status(200).json({
        success: true,
        results: favorites.length,
        data: favorites
      });
    } catch (error) {
      next(error);
    }
  }
}