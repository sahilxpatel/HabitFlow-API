import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import { apiLimiter } from './middlewares/rateLimiter.middleware';
import { protect } from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/errorHandler.middleware';

import authRoutes from './modules/auth/auth.routes';
import habitRoutes from './modules/habits/habit.routes';

dotenv.config();

const app = express();

// 1. Parse JSON request bodies
app.use(express.json());

// 2. Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// 3. Rate Limiter - global middleware
app.use(apiLimiter);

// 4. Mount auth routes
app.use('/api/auth', authRoutes);

// 5. Mount habit routes (protected by JWT middleware)
app.use('/api/habits', protect, habitRoutes);

// 6. Mount Swagger UI
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HabitFlow API',
      version: '1.0.0',
    },
  },
  apis: ['./src/modules/**/*.ts'], // Automatically reads swagger annotations from module files
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 7. Global Error Handler
app.use(errorHandler);

export default app;
