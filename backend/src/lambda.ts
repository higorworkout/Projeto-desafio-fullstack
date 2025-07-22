import { configure } from '@vendia/serverless-express';
import app from './app';

export const lambdaHandler = configure({ app });