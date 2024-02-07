import mongoose from 'mongoose';
import express from 'express';
import config from './utils/config';
import logger from './utils/logger';
import cors from 'cors';
import middleware from './utils/middleware';
import personRouter from './routes/personRouter'

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

// Set up routing for persons
app.use('/api/persons', personRouter);

// Middleware for handling unknown endpoints
app.use(middleware.unknownEndpoint);

