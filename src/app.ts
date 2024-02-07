import mongoose from 'mongoose';
import express from 'express';
import config from './utils/config';
import logger from './utils/logger';
import cors from 'cors';
import middleware from './utils/middleware';

const app = express();

mongoose.set('strictQuery', false);
logger.info('connecting to', config.MONGODB_URI!);
mongoose.connect(config.MONGODB_URI!)
  .then(() => logger.info('connected to MongoDB'))
  .catch((error: unknown) => {
    if (error instanceof Error) {
      logger.error('error connecting to MongoDB:', error.message);
    }
  });

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

// Set up Morgan
app.use(middleware.customMorgan);