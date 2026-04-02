import pool from '../config/database.js';
import { AppError } from '../utils/AppError.js';

export class FavoriteService {
  static async toggle(userId: number, propertyId: number) {
    const [existing]: any = await pool.query(
      'SELECT id FROM favorites WHERE user_id = ? AND property_id = ?',
      [userId, propertyId]
    );

    if (existing.length > 0) {
      await pool.query('DELETE FROM favorites WHERE user_id = ? AND property_id = ?', [userId, propertyId]);
      return { action: 'removed' };
    } else {
      await pool.query('INSERT INTO favorites (user_id, property_id) VALUES (?, ?)', [userId, propertyId]);
      return { action: 'added' };
    }
  }
  
  static async getMyFavorites(userId: number) {
    const [rows]: any = await pool.query(`
      SELECT p.*, i.image_url as thumbnail
      FROM properties p
      JOIN favorites f ON p.id = f.property_id
      LEFT JOIN property_images i ON p.id = i.property_id AND i.is_main = 1
      WHERE f.user_id = ? AND p.deleted_at IS NULL
    `, [userId]);
    
    return rows;
  }
}