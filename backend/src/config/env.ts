// src/config/env.ts
import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'development';

dotenv.config({
  path: `.env.${env}`
});

export const JWT_SECRET = process.env.JWT_SECRET as string;