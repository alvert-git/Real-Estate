import pool from '../config/database.js';
import { AppError } from '../utils/AppError.js';

export class PropertyService {
  static async createProperty(data: any, agentId: number, images: string[]) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [result]: any = await connection.query(
        `INSERT INTO properties (title, description, price, address, city, bedrooms, bathrooms, area_sqft, type, agent_id) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [data.title, data.description, data.price, data.address, data.city, data.bedrooms, data.bathrooms, data.area_sqft, data.type, agentId]
      );

      const propertyId = result.insertId;

      if (images.length > 0) {
        const imageValues = images.map((url, index) => [propertyId, url, index === 0]); // First image is main
        await connection.query(
          'INSERT INTO property_images (property_id, image_url, is_main) VALUES ?',
          [imageValues]
        );
      }

      await connection.commit();
      return propertyId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async getAllActive(page: number, limit: number, search: string, userId: number | null) {
    const offset = (page - 1) * limit;
    const searchTerm = `%${search}%`;

    const query = `
    SELECT p.*, i.image_url as thumbnail,
    IF(f.id IS NOT NULL, 1, 0) as isFavorite
    FROM properties p
    LEFT JOIN property_images i ON p.id = i.property_id AND i.is_main = 1
    LEFT JOIN favorites f ON p.id = f.property_id AND f.user_id = ?
    WHERE p.deleted_at IS NULL AND (p.title LIKE ? OR p.city LIKE ?)
    LIMIT ? OFFSET ?
  `;

    const [properties]: any = await pool.query(query, [userId, searchTerm, searchTerm, limit, offset]);

    const [countResult]: any = await pool.query(
      'SELECT COUNT(*) as total FROM properties WHERE deleted_at IS NULL AND (title LIKE ? OR city LIKE ?)',
      [searchTerm, searchTerm]
    );

    const totalItems = countResult[0].total;

    return {
      properties,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page
    };
  }

  static async softDelete(id: number, agentId: number) {
    const [result]: any = await pool.query(
      'UPDATE properties SET deleted_at = NOW() WHERE id = ? AND agent_id = ? AND deleted_at IS NULL',
      [id, agentId]
    );
    if (result.affectedRows === 0) throw new AppError('Property not found or already deleted', 404);
  }


  static async getAgentProperties(agentId: number) {
    const [rows] = await pool.query(`
    SELECT p.*, i.image_url as thumbnail 
    FROM properties p 
    LEFT JOIN property_images i ON p.id = i.property_id AND i.is_main = 1
    WHERE p.agent_id = ? AND p.deleted_at IS NULL
  `, [agentId]);
    return rows;
  }
}