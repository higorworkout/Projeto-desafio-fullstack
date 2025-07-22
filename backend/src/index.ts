import app from './app';

import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'docker';

dotenv.config({
  path: `.env.${env}`
});
import { AppDataSource } from './database/data-source';

console.log('JWT_SECRET:', process.env.JWT_SECRET);


const start = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET must be defined');
  }

  console.log('Connecting to PostgreSQL..' + process.env.DB_HOST);

  try {
    await AppDataSource.initialize();
    console.log('Connected to PostgreSQL via Prisma');

    const port = 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port} 🚀`);
      console.log(`CTRL + Clique http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error connecting to the database', err);
    process.exit(1);
  }
};

start();