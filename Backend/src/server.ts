import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import type { Request, Response, Application, NextFunction } from 'express';
import pool from './config/database.js';
import authRoutes from "./routes/auth.routes.js";
import propertyRoutes from "./routes/property.routes.js"
import favoriteRoutes from "./routes/favorite.routes.js"
import cors from 'cors';

const app: Application = express();
const PORT = Number(process.env.PORT) || 9000;


app.use(express.json());
app.use(
  cors({
    origin: `${process.env.VITE_FRONTEND_URL}`,
    credentials: true,
  })
);

app.get("/active", (req: Request, res: Response) => {
  res.status(200).json({ status: "I am Active" });
});

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/favorites', favoriteRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${statusCode}: ${message}`);

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});


async function startServer() {
  try {
    const connection = await pool.getConnection();
    connection.release();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log("Database Connected")
    });
  } catch (error) {
    console.error("Database connection failed. check your .env file.");
    console.error(error);
    process.exit(1);
  }
}

startServer();



