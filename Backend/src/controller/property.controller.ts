import type { Request, Response, NextFunction } from 'express';
import { PropertyService } from '../services/property.service.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

export class PropertyController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const agentId = (req as any).user.id;
      const files = req.files as Express.Multer.File[];
      
      const uploadPromises = files.map(file => uploadToCloudinary(file));
      const imageUrls = await Promise.all(uploadPromises);

      const propertyId = await PropertyService.createProperty(req.body, agentId, imageUrls);

      res.status(201).json({ success: true, data: { id: propertyId } });
    } catch (error) {
      next(error);
    }
  }


  static async getActive(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 6;
      const search = (req.query.search as string) || '';

      const userId = (req as any).user?.id || null;

      const result = await PropertyService.getAllActive(page, limit, search, userId);

      res.status(200).json({
        success: true,
        data: result.properties,
        pagination: {
          totalItems: result.totalItems,
          totalPages: result.totalPages,
          currentPage: result.currentPage
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await PropertyService.softDelete(Number(req.params.id), (req as any).user.id);
      res.status(200).json({ success: true, message: 'Property deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async getMyListings(req: Request, res: Response, next: NextFunction) {
    try {
      const agentId = (req as any).user.id;
      const properties = await PropertyService.getAgentProperties(agentId);
      res.status(200).json({ success: true, data: properties });
    } catch (error) {
      next(error);
    }
  }
}