import { configure } from '@vendia/serverless-express';
import app from './app';
import { AppDataSource } from './database/data-source';

let cachedHandler: any;

const bootstrap = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  // Agora que o DB está conectado, podemos configurar o app
  cachedHandler = configure({ app });
  return cachedHandler;
};

export const lambdaHandler = async (event: any, context: any) => {
  const handler = cachedHandler ?? (await bootstrap());
  return handler(event, context);
}