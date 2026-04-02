import pool from '../config/database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js';

export class AuthService {


  static generateToken(id: number, role: string) {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret', {
      expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as any,
    });
  }

  static async register(userData: any) {
    const { name, email, password, role } = userData;

    const [existingUser]: any = await pool.query('SELECT id FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      throw new AppError('A user with this email already exists', 409);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result]: any = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );

    return { id: result.insertId, name, email, role };
  }

  static async login(email: string, pass: string) {
    const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = this.generateToken(user.id, user.role);

    return {
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    };
  }

}